from flask import Blueprint, request, jsonify

bp = Blueprint('ai', __name__)

@bp.route('/chat', methods=['POST'])
def chat():
    data = request.json or {}
    return jsonify({"reply":"not implemented"})
