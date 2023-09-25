from flask import Flask
from flask import Blueprint
from flask_cors import CORS

from user import user

app = Flask(__name__)
# allow cors
CORS(app, resources='*', origins='*')

app.register_blueprint(user)

@app.route('/')
def main():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True, port=11451)