from flask import Flask, request, jsonify, Blueprint
from pymongo import MongoClient
import bcrypt
import re
from bson import ObjectId
import os
import jwt
from datetime import datetime, timedelta
from utiils.helper import is_valid_password, token_required, generate_token
from functools import wraps


auth_app = Blueprint('auth_app', __name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["racquethub_db"]
users_collection = db["users"]

# Set to store invalidated tokens
invalidated_tokens = set()

# Add protected routes here and use the token_required decorator
@auth_app.route('/api/protected', methods=['GET'])
@token_required
def protected_route():
    # The JWT token is valid, proceed with the protected logic
    return jsonify({'message': 'This is a protected route'})

@auth_app.route('/api/register', methods=['POST'])
def register():
    # Get data from request body
    data = request.json
    email = data.get('email')
    password = data.get('password')
    confirmPassword = data.get('confirmPassword')
    user_name = data.get('name')
    
    # Get the current timestamp
    current_time = datetime.utcnow()
    
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
        'password': hashed_password,
        'name': user_name,
        'createdAt': current_time,
        'membershipType': 'PRO',
        'payment':'SEASONAL',
        'trial':False,
        'season':'SPRING',
        'avatar':'avatarURL_here',
        'playerInfo':{
          'playingStyle':'counter_puncher',
          'leftyOrRighty':'lefty',
          'gear':'babolat'
        },
        'tennisRating':'4.0',
        'pickelBallRating':'unrated'
    })

    return jsonify({'message': 'User registered successfully'}), 201

@auth_app.route('/api/login', methods=['POST'])
def login():
    # Get data from request body
    data = request.json
    print(f'data here api/login ===== {data}')
    email = data.get('email')
    password = data.get('password')
    
    print(f'this is data ===== {data}')

    # Validate request data
    if not email:
        print("Missing 'email' field")
        return jsonify({'error': 'Missing email field'}), 400
    if not password:
        print("Missing 'password' field")
        return jsonify({'error': 'Missing password field'}), 400

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
    token = generate_token(email)

    # Return the token in the response
    return jsonify({'token': token, "data":user}), 200
 
@auth_app.route('/api/logout', methods=['POST'])
@token_required
def logout(current_user):
    print('logging out api')
    # Invalidate the token by adding it to the set
    token = request.headers.get('Authorization')
    print(f'what is token ==================== {token}')
    if token:
        invalidated_tokens.add(token)
        print(f'invalidated token {token}')

    # Clearing local storage can also be done here if necessary
    # localStorage.clear()

    return jsonify({'message': 'Logout successful'}), 200

