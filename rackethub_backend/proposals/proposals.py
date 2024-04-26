import json
from flask import Flask, request, jsonify, Blueprint
from pymongo import MongoClient
import bcrypt
import re
from bson import ObjectId
import os
import jwt
from datetime import datetime, timedelta
from bson import json_util
from utiils.helper import verify_token


proposal_app = Blueprint('proposal_app', __name__)
JWT_SECRET_KEY = "your_secret_key"

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["racquethub_db"]
proposals_collection = db["proposals"]

invalidated_tokens = set()


def get_user_by_email(email):
    print(f'user id {email}')
    # Assuming db is your database connection object
    user_details = db['users'].find_one({'email': email})
    return user_details

# Route for creating a new proposal
@proposal_app.route('/api/proposals', methods=['POST'])
def create_proposal():
    # Extract user_id from the request or any other relevant source
    user_email = request.json.get('email')

    # Fetch user details based on user_id
    user_details = get_user_by_email(user_email)

    # Check if the Authorization header is present
    if 'Authorization' not in request.headers:
        return jsonify({'error': 'Unauthorized'}), 401

    # Extract the JWT token from the Authorization header
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(" ")[1]

    try:
        # Verify the JWT token
        decoded_token = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])

        # Extract user_id and email from the decoded token
        user_id = decoded_token.get('user_id')
        email = decoded_token.get('email')

        # Extract data from the request
        data = request.json
        name = data.get('name')
        sport = data.get('sport')
        proposal_type = data.get('type')
        location = data.get('location')
        play_time = data.get('playTime')
        domain = data.get('domain')

        # Validate the data
        if not sport or not proposal_type or not location or not play_time or not domain:
            return jsonify({'error': 'Missing required fields'}), 400

        # Insert the proposal into the database
        proposal_id = proposals_collection.insert_one({
            'user': user_details,
            'sport': sport,
            'type': proposal_type,
            'location': location,
            'playTime': play_time,
            'domain': domain,
            'user_id': user_id  # Associate the proposal with the authenticated user
        }).inserted_id

        # Return the newly created proposal
        new_proposal = proposals_collection.find_one({'_id': proposal_id})
        new_proposal['_id'] = str(new_proposal['_id'])  # Convert ObjectId to string for JSON serialization
        return jsonify(new_proposal), 201

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

# Route for fetching all proposals
@proposal_app.route('/api/proposals', methods=['GET'])
def get_all_proposals():
    token = request.headers.get('Authorization')
    print(f'What is token: {token}')

    # Verify the token
    decoded_token = verify_token(token)
    
    if decoded_token:
        # Extract user_id from the decoded token
        user_id = decoded_token.get('user_id')

        # Fetch all proposals associated with the authenticated user
        user_proposals = proposals_collection.find({'user_id': user_id})

        # Serialize MongoDB documents to JSON format
        serialized_proposals = json.loads(json_util.dumps(user_proposals))

        return jsonify(serialized_proposals), 200
    else:
        # Token is invalid
        return jsonify({'error': 'Invalid token'}), 401
