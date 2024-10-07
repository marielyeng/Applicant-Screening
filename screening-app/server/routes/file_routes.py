from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename
from models import db
from models.file_model import File
from config import Config
import os
from datetime import datetime

# Create a Blueprint for file-related routes
file_bp = Blueprint('file_bp', __name__)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'docx'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to upload a file
@file_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request.'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No file selected for uploading.'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_filename = f"{int(datetime.utcnow().timestamp())}_{filename}"
        file_path = os.path.join(Config.UPLOAD_FOLDER, unique_filename)
        file.save(file_path)

        file_size = os.path.getsize(file_path)

        new_file = File(file_name=filename, file_path=file_path, file_size=file_size)
        db.session.add(new_file)
        db.session.commit()

        return jsonify({
            'message': 'File successfully uploaded.',
            'file': {
                'id': new_file.id,
                'file_name': new_file.file_name,
                'file_path': new_file.file_path,
                'file_size': new_file.file_size,
                'uploaded_at': new_file.uploaded_at
            }
        }), 201

    return jsonify({'message': 'Allowed file types are png, jpg, jpeg, gif, pdf, docx.'}), 400
