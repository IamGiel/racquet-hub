from flask import Flask, request, jsonify, Blueprint
from pymongo import MongoClient
import bcrypt
import re
from bson import ObjectId
import os
import jwt
from datetime import datetime, timedelta


auth_app = Blueprint('auth_app', __name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["racquethub_db"]
users_collection = db["users"]

JWT_SECRET_KEY = "your_secret_key"
JWT_EXPIRATION_DELTA = timedelta(
    days=1,
    seconds=0,
    microseconds=0,
    milliseconds=0,
    minutes=0,
    hours=0,
    weeks=0
)

# Get the current UTC date and time
current_time_utc = datetime.now()

# Calculate the expiration time by adding the expiration delta
expiration_time = current_time_utc + JWT_EXPIRATION_DELTA


# Generate JWT token
def generate_token(user_id, email):
  payload = {
      'user_id': str(user_id),
      'email': email,
      'exp': expiration_time
  }
  token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
  return token


# Token invalidation (dummy implementation, you may store invalidated tokens in a database)
invalid_tokens = set()

def is_valid_password(password):
    # Check if password is at least 8 characters long
    if len(password) < 8:
        return False
    
    # Check if password contains at least one special character
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return False

    # Check if password contains at least one capital letter
    if not re.search(r'[A-Z]', password):
        return False

    # Check if password contains at least one small letter
    if not re.search(r'[a-z]', password):
        return False

    return True

@auth_app.route('/api/register', methods=['POST'])
def register():
    # Get data from request body
    data = request.json
    email = data.get('email')
    password = data.get('password')
    confirmPassword = data.get('confirmPassword')
    
    if password != confirmPassword:
        return jsonify({'error': 'Passwords do not match'}), 400

    # Validate request data
    if not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if the email is already registered
    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email is already registered'}), 400
      
    # Enforce password complexity requirements
    if not is_valid_password(password):
        return jsonify({'error': 'Password must be at least 8 characters long, contain at least one special character, one capital letter, and one small letter'}), 400


    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Insert the new user into the database
    users_collection.insert_one({
        'email': email,
        'password': hashed_password
    })

    return jsonify({'message': 'User registered successfully'}), 201


@auth_app.route('/api/login', methods=['POST'])
def login():
    # Get data from request body
    data = request.json
    print(data)
    email = data.get('username')
    password = data.get('password')

    # Validate request data
    if not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if the user exists in the database
    user = users_collection.find_one({'email': email})
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Verify the password
    if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({'error': 'Invalid password'}), 401

    # Remove the password from the user object before returning
    user.pop('password')

    # Convert ObjectId to string for JSON serialization
    user['_id'] = str(user['_id'])

    # Generate JWT token
    token = generate_token(user['_id'], email)

    # Return the token in the response
    return jsonify({'token': token, "data":user}), 200
 
@auth_app.route('/api/logout', methods=['POST'])
def logout():
    # You may perform any additional logout logic here, such as invalidating tokens or session management
    # For this example, let's assume a simple success message
    
    return jsonify({'message': 'Logout successful'}), 200

