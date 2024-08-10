import json
from flask import Flask, request, jsonify, Blueprint
from pymongo import MongoClient
from bson import ObjectId
# from datetime import datetime
from datetime import datetime, timezone
from bson import json_util, ObjectId
from utiils.helper import verify_token, token_required


proposal_app = Blueprint('proposal_app', __name__)
JWT_SECRET_KEY = "your_secret_key"

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["racquethub_db"]
proposals_collection = db["proposals"]

invalidated_tokens = set()

# Route for creating a new proposal CREATE
@proposal_app.route('/api/proposals', methods=['POST'])
@token_required
def create_proposal(current_user):
    token = request.headers.get('Authorization')
    print(f'What is token: {token}')
    
    # Verify the token
    decoded_token = verify_token(token)
    if not decoded_token:
        return jsonify({'error': 'Invalid or expired token'}), 401
      
    print(f'decoded token ========== {decoded_token}')
    
    # Extract user_id and email from the decoded token
    user_id = decoded_token.get('user_id')
    email = decoded_token.get('email')
    name = decoded_token.get('name')
    sportType = decoded_token.get('name')
    playTime = decoded_token.get('name')
    
    # Get the current timestamp
    current_time = datetime.utcnow()
    # current_time = datetime.now(timezone.utc)
    # current_utc_time = datetime.utcnow()  
    # Check if required fields are present
    if not sportType or not playTime:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Include user details from the token payload
    user_details = {
        'user_id': user_id,
        'email': email,
        'name': name
    }
    
    
    # Merge user details with the proposal data
    proposal_data = {
        **request.json,  # Include all data from the request body
        'user_details': user_details,
        'createdAt':current_time
    }
    
    print(f'this is user details {proposal_data}')

    
    # Insert the document into the proposals collection
    result = proposals_collection.insert_one(proposal_data)
    
    # Create the proposal in the database (example)
    # Replace this with your actual database logic
    print(f'proposal data {proposal_data}')
    
    # Return a success response
    return jsonify({'message': 'Proposal created successfully', 'result':str(result)}), 201

# Route for fetching all proposals GET ALL
@proposal_app.route('/api/proposals', methods=['GET'])
# @token_required
def get_all_proposals():
  # Pagination parameters
  page = request.args.get('page', default=1, type=int)
  per_page = request.args.get('per_page', default=20, type=int)
  
  # Sorting parameters
  sort_by = request.args.get('sort_by', default='_id', type=str)
  sort_order = request.args.get('sort_order', default='desc', type=str)

  # Validate sort order
  if sort_order.lower() not in ['asc', 'desc']:
    return jsonify({'error': 'Invalid sort order. Use "asc" or "desc"'}), 400


  # Calculate skip and limit values for pagination
  skip = (page - 1) * per_page
  limit = per_page

  # Fetch all proposals from the database with pagination
  all_proposals = proposals_collection.find().skip(skip).limit(limit).sort(sort_by, 1 if sort_order.lower() == 'asc' else -1)

  # Serialize MongoDB documents to JSON format
  serialized_proposals = json.loads(json_util.dumps(all_proposals))

  # Get the total count of proposals
  total_proposals = proposals_collection.count_documents({})

  # Calculate total pages
  total_pages = (total_proposals + per_page - 1) // per_page

  # Construct pagination metadata
  pagination = {
      'total': total_proposals,
      'total_pages': total_pages,
      'page': page,
      'per_page': per_page
  }
  
  # Include sort information in the response
  sort_info = {
    'sort_by': sort_by,
    'sort_order': sort_order
  }

  return jsonify({'proposals': serialized_proposals, 'pagination': pagination, 'sort_info': sort_info}), 200

# Route for fetching proposals by a specific user GET BY ID
@proposal_app.route('/api/proposals/user/<user_id>', methods=['GET'])
@token_required
def get_proposals_by_user(current_user, user_id):
    # Check if the requesting user is authorized to access the proposals
    if current_user['user_id'] != user_id:
        return jsonify({'error': 'You are not authorized to access these proposals'}), 403
      
    # Pagination parameters
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=2, type=int)
      
    # Sorting parameters
    sort_by = request.args.get('sort_by', default='_id', type=str)
    sort_order = request.args.get('sort_order', default='asc', type=str)

    # Validate sort order
    if sort_order.lower() not in ['asc', 'desc']:
      return jsonify({'error': 'Invalid sort order. Use "asc" or "desc"'}), 400

    # Calculate skip and limit values for pagination
    skip = (page - 1) * per_page
    limit = per_page    
    
    # Fetch all proposals associated with the specified user_id
    user_proposals = proposals_collection.find({'user_details.user_id': user_id}).sort(sort_by, 1 if sort_order.lower() == 'asc' else -1)

    # Serialize MongoDB documents to JSON format
    serialized_proposals = json.loads(json_util.dumps(user_proposals))

    # Get the total count of proposals
    # total_proposals = proposals_collection.count_documents({})
    total_proposals = proposals_collection.count_documents({'user_details.user_id': user_id})

    # Calculate total pages
    total_pages = (total_proposals + per_page - 1) // per_page

    # Construct pagination metadata
    pagination = {
        'total': total_proposals,
        'total_pages': total_pages,
        'page': page,
        'per_page': per_page
    }
    
    # Include sort information in the response
    sort_info = {
      'sort_by': sort_by,
      'sort_order': sort_order
    }

    return jsonify({'proposals': serialized_proposals, 'pagination': pagination, 'sort_info':sort_info}), 200  
  
  
# Route for updating a proposal UPDATE
@proposal_app.route('/api/proposals/<proposal_id>', methods=['PUT'])
@token_required
def update_proposal(current_user, proposal_id):
  
    try:
      # Attempt to convert the proposal_id into an ObjectId
      proposal_id = ObjectId(proposal_id)
    except Exception as e:
      # Return a custom error message for invalid ObjectId
      return jsonify({'error': 'Invalid proposal ID'}), 400
    
    # Fetch the proposal from the database
    proposal = proposals_collection.find_one({'_id': proposal_id})

    # Check if the proposal exists
    if not proposal:
      return jsonify({'error': 'Proposal not found'}), 404

    # Check if the user is authorized to update the proposal
    if proposal['user_details']['user_id'] != current_user['user_id']:
      return jsonify({'error': 'You are not authorized to update this proposal'}), 403
      
    # Retrieve the existing proposal from the database
    existing_proposal = proposals_collection.find_one({'_id': ObjectId(proposal_id)})
    if not existing_proposal:
      return jsonify({'error': 'Proposal not found'}), 404
    
    print(f'request json ============ {request.json}')
    
    # Ensure that the user_details field remains unchanged
    updated_proposal_data = request.json
    updated_proposal_data['user_details'] = existing_proposal.get('user_details')
    
    # Perform the update operation
    result = proposals_collection.update_one(
        {'_id': ObjectId(proposal_id)},
        {'$set': updated_proposal_data}
    )
    
    if result.modified_count == 1:
      return jsonify({'message': 'Proposal updated successfully'}), 200
    else:
      return jsonify({'error': 'Failed to update proposal'}), 500

# Route for deleting a proposal DELETE
@proposal_app.route('/api/proposals/<proposal_id>', methods=['DELETE'])
@token_required
def delete_proposal(current_user, proposal_id):
    try:
      # Attempt to convert the proposal_id into an ObjectId
      proposal_id = ObjectId(proposal_id)
    except Exception as e:
      # Return a custom error message for invalid ObjectId
      return jsonify({'error': 'Invalid proposal ID'}), 400
    
    # Fetch the proposal from the database
    proposal = proposals_collection.find_one({'_id': proposal_id})

    # Check if the proposal exists
    if not proposal:
      return jsonify({'error': 'Proposal not found'}), 404

    # # Check if the user is authorized to delete the proposal
    # if proposal['user_details']['user_id'] != current_user['_id']:
    #   return jsonify({'error': 'You are not authorized to delete this proposal'}), 403


    # Perform the delete operation
    result = proposals_collection.delete_one({'_id': ObjectId(proposal_id)})
    
    if result.deleted_count == 1:
      return jsonify({'message': 'Proposal deleted successfully'}), 200
    else:
      return jsonify({'error': 'Failed to delete proposal'}), 500
    

# Route for joining a proposal
@proposal_app.route('/api/proposals/<proposal_id>/join', methods=['POST'])
@token_required
def join_proposal(current_user, proposal_id):
    proposal_id = ObjectId(proposal_id)

    # Fetch the proposal from the database
    proposal = proposals_collection.find_one({'_id': proposal_id})

    # Check if the proposal exists
    if not proposal:
        return jsonify({'error': 'Proposal not found'}), 404

    # Determine the maximum number of participants
    max_participants = 3 if proposal['type'] == 'Doubles' else 1

    # Check if the current user has already joined the proposal
    for participant in proposal.get('participants', []):
        if participant['user_id'] == current_user['user_id']:
            return jsonify({'error': 'You have already joined this proposal'}), 400

    # Check if the maximum number of participants has been reached
    if len(proposal.get('participants', [])) >= max_participants:
        return jsonify({'error': 'The proposal has reached the maximum number of participants'}), 400

    # Get the user's name from the request body
    data = request.get_json()
    name = data.get('name', 'Anonymous User')

    # Add the current user to the participants list
    proposals_collection.update_one(
        {'_id': proposal_id},
        {'$push': {
            'participants': {
                'user_id': current_user['user_id'],
                'email': current_user['email'],
                'name': name
            }
        }}
    )

    return jsonify({'message': 'Successfully joined the proposal'}), 200


# route to UNJOIN current user from a proposal
@proposal_app.route('/api/proposals/<proposal_id>/unjoin', methods=['POST'])
@token_required
def unjoin_proposal(current_user, proposal_id):
    try:
        # Attempt to convert the proposal_id into an ObjectId
        proposal_id = ObjectId(proposal_id)
    except Exception as e:
        return jsonify({'error': 'Invalid proposal ID'}), 400

    # Fetch the proposal from the database
    proposal = proposals_collection.find_one({'_id': proposal_id})

    # Check if the proposal exists
    if not proposal:
        return jsonify({'error': 'Proposal not found'}), 404

    # Check if the current user is a participant in the proposal
    participants = proposal.get('participants', [])
    participant_ids = [participant['user_id'] for participant in participants]

    if current_user['user_id'] not in participant_ids:
        return jsonify({'error': 'You are not a participant in this proposal'}), 400

    # Remove the current user from the participants list
    updated_participants = [participant for participant in participants if participant['user_id'] != current_user['user_id']]
    
    # Update the proposal in the database
    result = proposals_collection.update_one(
        {'_id': proposal_id},
        {'$set': {'participants': updated_participants}}
    )

    if result.modified_count == 1:
        return jsonify({'message': 'Successfully unjoined the proposal'}), 200
    else:
        return jsonify({'error': 'Failed to unjoin the proposal'}), 500
