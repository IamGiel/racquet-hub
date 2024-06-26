from flask import Flask, session
from authentication.auth_routes import auth_app
from proposals.proposals import proposal_app
from userProfile.userProfile import user_profile_api
from flask_cors import CORS


app = Flask(__name__, static_folder='../build/')
CORS(app)  # This will enable CORS for all routes

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


app.register_blueprint(auth_app)
app.register_blueprint(proposal_app)
app.register_blueprint(user_profile_api)

@app.route('/<name>') # dynamic route 
def print_name(name):
  return f'Hi, {session}'.format(name)

if __name__ == '__main__':
    app.run(debug=True)
