from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure the database (SQLite in this example)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///keywords.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the database model
class Keyword(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    keyword = db.Column(db.String(100), nullable=False)

# Initialize the database
with app.app_context():
    db.create_all()

# Route to save an array of keywords
@app.route('/save_keywords', methods=['POST'])
def save_keywords():
    data = request.json
    keywords = data.get('keywords', [])

    if not isinstance(keywords, list):
        # return jsonify({'message': 'Invalid input, expected a list of keywords'}), 400
        return jsonify({'message': 'Unable to save keywords. Please Try Again'}), 400

    # Add keywords to the database
    for word in keywords:
        new_keyword = Keyword(keyword=word)
        db.session.add(new_keyword)

    db.session.commit()
    return jsonify({'message': 'Keywords saved successfully!'})

# Route to retrieve random keywords
@app.route('/get_random_keywords', methods=['GET'])
def get_random_keywords():
    count = int(request.args.get('count', 5))  # Number of keywords to retrieve (default: 5)
    all_keywords = Keyword.query.all()

    if not all_keywords:
        return jsonify({'message': 'No keywords found in the database'}), 404

    random_keywords = random.sample([k.keyword for k in all_keywords], min(count, len(all_keywords)))
    return jsonify({'random_keywords': random_keywords})

if __name__ == '__main__':
    app.run(debug=True)
