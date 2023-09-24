from flask import Blueprint
from flask import request
from json import dumps

user = Blueprint('user', __name__)

@user.route('/login', methods=['POST'])
def login():
    return dumps({
        'message': 'success',
        'access': '123456',
        'refresh': '1234567890'
    })