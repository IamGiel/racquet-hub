from flask import Flask
from authentication.auth_routes import auth_app
from proposals.proposals import proposal_app
from flask_cors import CORS


app = Flask(__name__, static_folder='../build/')
CORS(app)  # This will enable CORS for all routes

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


app.register_blueprint(auth_app)
app.register_blueprint(proposal_app)

@app.route('/<name>') # dynamic route
def print_name(name):
  return 'Hi, {}'.format(name)

if __name__ == '__main__':
    app.run(debug=True)
