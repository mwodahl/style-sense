from flask import Flask
api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Alicia Thoney",
        "about": "Hello there."
    }

    return response_body