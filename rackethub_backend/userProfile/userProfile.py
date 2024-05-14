import json
from flask import Flask, request, jsonify, Blueprint
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
from bson import json_util, ObjectId
from utiils.helper import verify_token, token_required


user_profile_api = Blueprint('user', __name__)
JWT_SECRET_KEY = "your_secret_key"

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["racquethub_db"]
proposals_collection = db["proposals"]

invalidated_tokens = set()

# GET USER PROFILE
@user_profile_api.route('/api/userProfile', methods=['GET'])
@token_required
def get_user_profile(current_user):
    
    # if this current user id is equal to user_id allow to fetchdetails of this user
   
    # Query MongoDB collection for user profile by ID
    user_profile = db.users.find_one({'_id': ObjectId(current_user['user_id'])})
    
    
    # Check if user profile exists
    if user_profile:
        # Serialize user profile data into JSON format
        serialized_profile = json.loads(json_util.dumps(user_profile))
        return jsonify({"data": serialized_profile}), 200
    else:
        # User profile not found, return 404 error
        return jsonify({'error': 'User profile not found'}), 404


# GET USER PROFILE BY ID
@user_profile_api.route('/api/userProfile/<user_id>', methods=['GET'])
@token_required
def get_user_profile_by_id(current_user, user_id):
    # Query MongoDB collection for user profile by ID, excluding sensitive fields
    user_profile = db.users.find_one({'_id': ObjectId(user_id)}, {'password': 0, 'payment':0, 'membershipType':0, 'trial':0, 'createdAt':0, '_id':0})
    
    # Check if user profile exists
    if user_profile:
        # Serialize user profile data into JSON format
        serialized_profile = json.loads(json_util.dumps(user_profile))
        return jsonify({"data": serialized_profile}), 200
    else:
        # User profile not found, return 404 error
        return jsonify({'error': 'User profile not found'}), 404
      
      
# UPDATE USER PROFILE
@user_profile_api.route('/api/userProfile', methods=['PUT'])
@token_required
def update_user_profile(current_user):
       
    # Query MongoDB collection for user profile by ID
    existing_user_profile = db.users.find_one({'_id': ObjectId(current_user['user_id'])})
    
    if not existing_user_profile:
      return jsonify({'error':'User not found'})
    
    # Ensure that the user_details field remains unchanged
    updated_user_info = request.json
    
    # Ensure that sensitive fields like password are not updated
    if 'password' in updated_user_info:
        del updated_user_info['password']    
    if 'createdAt' in updated_user_info:
        del updated_user_info['createdAt']
    if '_id' in updated_user_info:
        del updated_user_info['_id']
        
    # Add or update the profileEditedAt field with the current date and time
    updated_user_info['profileEditedAt'] = datetime.now()
    
    # Perform the update operation
    result = db.users.update_one(
        {'_id': ObjectId(current_user['user_id'])},
        {'$set': updated_user_info}
    )
    
    if result.modified_count == 1:
        return jsonify({'message': 'User profile updated successfully', 'response': updated_user_info}), 200
    else:
        return jsonify({'error': 'Failed to update user profile'}), 500
