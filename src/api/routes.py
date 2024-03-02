"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, List, Gift
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
# CORS(api, resources={r"/api/*": {"origins": "https://reimagined-space-spork-r4rv5qpxxx9hp5v6-3001.app.github.dev/"}})

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg": "User not found"}), 401
    if user.password != password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    email = get_jwt_identity()
    dictionary = {"message": "hello User " + email}
    return jsonify(dictionary)

@api.route("/privateuser", methods=["GET"])
@jwt_required()
def get_user():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if user:
        if user.name:
            message = "Welcome " + user.name
        else:
            message = "Welcome " + user.email

        user_data = {
            "message": message,
            "name": user.name,
            "id": user.id,
            "email": user.email,
            "img": user.img
        }
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404

@api.route("/privatelist", methods=["GET"])
def get_list():
    id = request.args.get("id")
    
    if id is None:
        return jsonify({"message": "ID parameter missing"}), 400
    current_user = User.query.get(id)

    if not current_user:
        return jsonify({"message": "User not found"}), 404
    
    user_list = List.query.filter_by(user=current_user).all()
    user_list = list(map(lambda x: x.serialize(), user_list))

    return jsonify(user_list), 200

    # email = get_jwt_identity()
    # user = User.query.filter_by(email=email).first()

    # if user:
    #     lists = List.query.filter_by(user_id=user.id).all()

    #     if lists:
    #         list_data = [{"id": list.id, "user_id": list.user_id, "name": list.name} for list in lists]
    #         return jsonify(list_data), 200
    #     else:
    #         return jsonify({"message": "No lists found for this user"}), 404
    # else:
    #     return jsonify({"error": "User not found"}), 404

@api.route('/user', methods=['GET'])
def get_all_users():

    all_users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), all_users))

    return jsonify(all_users), 200

@api.route("/user", methods=["POST"])
def add_user():
    email = request.json.get("email")
    password = request.json.get("password")
    img = request.json.get("img")

    required_fields = [email, password,img]

    if any(field is None for field in required_fields):
        return jsonify({'error': 'You must provide an email and a password'}), 400
    
    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"msg": "This user already has an account"}), 401
    
    try:
        new_user = User(email=email, password=password, img=img, name="")
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'response': 'User added successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
