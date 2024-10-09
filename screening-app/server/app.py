import os
from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import job_bp, file_bp, auth_bp  # Import auth_bp
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Initialize SQLAlchemy with app
db.init_app(app)

# Initialize JWT
jwt = JWTManager(app)

# Register Blueprints with a URL prefix
app.register_blueprint(job_bp, url_prefix='/api')
app.register_blueprint(file_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    port = app.config['PORT']
    app.run(host='0.0.0.0', port=port, debug=True)
