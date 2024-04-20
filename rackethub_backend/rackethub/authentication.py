from flask import Flask, request, jsonify
from pymongo import MongoClient
import bcrypt
import re
from bson import ObjectId

app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["racquethub_db"]
users_collection = db["users"]

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

@app.route('/api/register', methods=['POST'])
def register():
    # Get data from request body
    data = request.json
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    confirmPassword = data.get('confirmPassword')
    
    if password != confirmPassword:
        return jsonify({'error': 'Passwords do not match'}), 400

    # Validate request data
    if not email or not username or not password:
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
        'username': username,
        'password': hashed_password
    })

    return jsonify({'message': 'User registered successfully'}), 201


@app.route('/api/login', methods=['POST'])
def login():
    # Get data from request body
    data = request.json
    email = data.get('email')
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
    
     # Return the user information along with the success message
    return jsonify({
        'message': 'Login successful',
        'user': {
            '_id': user['_id'],
            'email': user['email'],
            'username': user['username'],
            'about': user.get('about'),
            'isAuthenticated': user.get('isAuthenticated'),
            'tennisRanking': user.get('tennisRanking'),
            'pickleballRanking': user.get('pickleballRanking'),
            'tennisDetails': user.get('tennisDetails')
        }
    }), 200
  
if __name__ == '__main__':
    app.run(debug=True)
