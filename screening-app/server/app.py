# app.py
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from config import Config
from models import db, File
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Initialize SQLAlchemy
db.init_app(app)

# Ensure upload folder exists
if not os.path.exists(app.config['uploads']):
    os.makedirs(app.config['uploads'])

# Allowed extensions (adjust as needed)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'docx'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB

app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request.'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'message': 'No file selected for uploading.'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Create a unique filename to prevent overwriting
        unique_filename = f"{int(datetime.utcnow().timestamp())}_{filename}"
        file_path = os.path.join(app.config['uploads'], unique_filename)
        file.save(file_path)

        # Get file size
        file_size = os.path.getsize(file_path)

        # Create a new File record
        new_file = File(
            file_name=filename,
            file_path=file_path,
            file_size=file_size
        )

        # Add to the database
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
    else:
        return jsonify({'message': 'Allowed file types are png, jpg, jpeg, gif, pdf, docx.'}), 400

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    app.run(host='0.0.0.0', port=app.config['PORT'], debug=True)
