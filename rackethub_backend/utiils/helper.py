import re
import jwt
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify
from pymongo import MongoClient

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["racquethub_db"]
users_collection = db["users"]


JWT_SECRET_KEY = "your_secret_key"
JWT_EXPIRATION_DELTA = timedelta(
    days=0,
    seconds=30,
    microseconds=0,
    milliseconds=0,
    minutes=5,
    hours=0,
    weeks=0
)

# Get the current UTC date and time
current_time_utc = datetime.now()

# Calculate the expiration time by adding the expiration delta
expiration_time = current_time_utc + JWT_EXPIRATION_DELTA

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
  
# Generate JWT token
def generate_token(email):
    # Retrieve user details from the database based on the email
    user = users_collection.find_one({'email': email})
    if not user:
        return None  # User not found
    
    # Get the user's ID and email
    user_id = str(user['_id'])
    email = user['email']
    name = user['name']
    
    # Calculate the expiration time for the token
    expiration_time = datetime.utcnow() + JWT_EXPIRATION_DELTA
    
    # Define the payload including the expiration time
    payload = {
        'user_id': user_id,
        'email': email,
        'name': name,
        'exp': expiration_time
    }
    
    # Encode the payload into a JWT token
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
    return token
  
  
def verify_token(token):
    print(f'verified_token token >>>>>>> ', token)
    # Check if the token starts with 'Bearer'
    if token.startswith('Bearer '):
        # If it does, remove the prefix
        token = token.split(' ')[1]
    
    try:
        # Verify the token without the 'Bearer' prefix
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        print(f'verified token payload =============== {payload}')
        return payload
    except jwt.ExpiredSignatureError:
        return None  # Token has expired
    except jwt.InvalidTokenError:
        return None  # Invalid token

def token_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        token = token.split("Bearer ")[-1]  # Extract the token from the Authorization header

        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
            # Add any additional checks on the payload if needed
            current_user = {
              'user_id': payload['user_id'],
              'email': payload['email']
              # Include other user information as needed
            }
            
            print(f'decorated function current user obj {current_user}')

        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401

        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        return func(current_user, *args, **kwargs)

    return decorated_function
