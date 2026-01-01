from flask import Blueprint, jsonify

bp = Blueprint('analytics', __name__)

@bp.route('/health')
def health():
    return jsonify({"status":"ok"})
