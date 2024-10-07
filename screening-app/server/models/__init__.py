# models/__init__.py

from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy
db = SQLAlchemy()

# Import all models to register them with SQLAlchemy
from .job_model import Job
from .file_model import File
from .user_model import User
