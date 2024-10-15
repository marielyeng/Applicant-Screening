from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename
from models import db
from models.file_model import File
from config import Config
import os
from datetime import datetime
import re
from PyPDF2 import PdfReader
from docx import Document
from PIL import Image  # For handling image files
import pytesseract  # For OCR on image files

# Create a Blueprint for file-related routes
file_bp = Blueprint('file_bp', __name__)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf', 'docx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Function to extract text from an image using Tesseract OCR
def extract_data_from_image(file_path):
    image = Image.open(file_path)
    text = pytesseract.image_to_string(image)
    return text

# Function to extract text from a PDF
def extract_data_from_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

# Function to extract text from a DOCX
def extract_data_from_docx(file_path):
    doc = Document(file_path)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

# Function to extract name, email, and phone using regex
def extract_personal_info(text):
    name_pattern = r"(First Name|Name):?\s*(\w+)\s*(Last Name|Surname)?:?\s*(\w+)?"
    email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    phone_pattern = r"(Phone|Mobile|number):?\s*(\+?\d[\d\s-]+)"

    name_match = re.search(name_pattern, text)
    email_match = re.search(email_pattern, text)
    phone_match = re.search(phone_pattern, text)

    first_name = name_match.group(2) if name_match else ""
    last_name = name_match.group(4) if name_match else ""
  
    if email_match:
        email = email_match.group(0)
    else:
        email = None
    phone = phone_match.group(2) if phone_match else ""

    return {
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'phone': phone
    }

# Route to upload and parse a file
@file_bp.route('/uploads', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request.'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No file selected for uploading.'}), 400

    if file and allowed_file(file.filename):
        # Save the file
        filename = secure_filename(file.filename)
        unique_filename = f"{int(datetime.utcnow().timestamp())}_{filename}"
        file_path = os.path.join(Config.UPLOAD_FOLDER, unique_filename)
        file.save(file_path)

        # Parse the file based on its extension
        file_text = ""
        if filename.lower().endswith('.pdf'):
            file_text = extract_data_from_pdf(file_path)
        elif filename.lower().endswith('.docx'):
            file_text = extract_data_from_docx(file_path)
        elif filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            file_text = extract_data_from_image(file_path)

        # Extract personal information from the parsed text
        personal_info = extract_personal_info(file_text)

        # Save file record in the database
        file_size = os.path.getsize(file_path)
        new_file = File(file_name=filename, file_path=file_path, file_size=file_size)
        db.session.add(new_file)
        db.session.commit()

        # Return file and personal info as a response
        return jsonify({
            'message': 'File successfully uploaded.',
            'file': {
                'id': new_file.id,
                'file_name': new_file.file_name,
                'file_path': new_file.file_path,
                'file_size': new_file.file_size,
                'uploaded_at': new_file.uploaded_at
            },
            'personal_info': personal_info  # Extracted personal information
        }), 201

    return jsonify({'message': 'Allowed file types are png, jpg, jpeg, gif, pdf, docx.'}), 400

# Route to delete a file
@file_bp.route('/uploads/<int:file_id>', methods=['DELETE'])
def delete_file(file_id):
    file = File.query.get(file_id)

    if not file:
        return jsonify({'message': 'File not found.'}), 404

    # Delete the file from the filesystem
    if os.path.exists(file.file_path):
        os.remove(file.file_path)

    # Delete the file record from the database
    db.session.delete(file)
    db.session.commit()

    return jsonify({'message': 'File successfully deleted.'}), 200
