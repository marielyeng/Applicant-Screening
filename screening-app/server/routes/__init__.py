# routes/__init__.py

from .job_routes import job_bp
from .file_routes import file_bp
from .auth_routes import auth_bp  # Import the auth Blueprint

__all__ = ['job_bp', 'file_bp', 'auth_bp']  # Include auth_bp in __all__
