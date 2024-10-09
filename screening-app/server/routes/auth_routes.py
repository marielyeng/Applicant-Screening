from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from models import db
from models.user_model import User
from config import Config

auth_bp = Blueprint('auth_bp', __name__)

# Initialize JWT
jwt = JWTManager()

@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Register a new user. This endpoint is optional if you manage users manually.
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required.'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists.'}), 409

    new_user = User(username=username)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully.'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Authenticate user and return a JWT.
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required.'}), 400

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200

    return jsonify({'message': 'Invalid credentials.'}), 401

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    """
    An example protected route.
    """
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({'message': f'Hello, {user.username}! This is a protected route.'}), 200

