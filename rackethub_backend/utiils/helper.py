import re
import jwt
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify


JWT_SECRET_KEY = "your_secret_key"
JWT_EXPIRATION_DELTA = timedelta(
    days=0,
    seconds=5,
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
def generate_token(user_id, email):
    # Calculate the expiration time for the token
    expiration_time = datetime.utcnow() + JWT_EXPIRATION_DELTA
    
    # Define the payload including the expiration time
    payload = {
        'user_id': str(user_id),
        'email': email,
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

        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401

        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        return func(*args, **kwargs)

    return decorated_function
