from . import db
from passlib.hash import bcrypt

class User(db.Model):
    __tablename__ = 'Users'  # Explicitly naming the table
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def set_password(self, password):
        """Hash and set the user's password."""
        self.password_hash = bcrypt.hash(password)

    def check_password(self, password):
        """Check if the provided password matches the stored hash."""
        return bcrypt.verify(password, self.password_hash)
