from flask import Blueprint, jsonify
from ai_services.predictions import GradePredictor

analytics_bp = Blueprint('analytics_routes', __name__)
predictor = GradePredictor()

@analytics_bp.route('/predict-grade', methods=['GET'])
def get_prediction():
    # Hardcoded input for simulation
    mock_data = {"quiz": 85, "midterm": 88}
    result = predictor.forecast(mock_data)
    return jsonify(result)