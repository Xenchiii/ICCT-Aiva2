from flask import Blueprint, jsonify, request # pyright: ignore[reportMissingImports]
from ai_services import GradePredictor, AnalyticsEngine
from utils.helpers import format_response

analytics_bp = Blueprint('analytics_routes', __name__)

# Initialize Services
predictor = GradePredictor()
engine = AnalyticsEngine()

@analytics_bp.route('/predict-grade', methods=['POST'])
def get_prediction():
    """
    Predicts the next grade based on a list of previous scores.
    Expects JSON: { "grades": [85, 88, 92] }
    """
    try:
        data = request.json
        grades = data.get('grades', [])
        result = predictor.forecast(grades)
        return jsonify(format_response(result))
    except Exception as e:
        return jsonify(format_response(None, str(e), 500))

@analytics_bp.route('/class-performance', methods=['POST'])
def class_performance():
    """
    Calculates statistics for a whole class.
    Expects JSON: { "class_data": [{ "student": "Name", "grade": 85 }, ...] }
    """
    try:
        data = request.json
        grades_list = data.get('class_data', [])
        result = engine.get_class_performance(grades_list)
        return jsonify(format_response(result))
    except Exception as e:
        return jsonify(format_response(None, str(e), 500))

@analytics_bp.route('/student-engagement/<student_id>', methods=['GET'])
def student_engagement(student_id):
    """
    Returns engagement velocity (simulated via login logs).
    In a real app, this would query a database.
    """
    try:
        # For demo purposes, we create a dummy list of logins
        # Real logic would be: login_logs = db.get_logs(student_id)
        mock_logins = range(25) # Simulate 25 logins
        result = engine.get_student_engagement(mock_logins)
        result['student_id'] = student_id
        return jsonify(format_response(result))
    except Exception as e:
        return jsonify(format_response(None, str(e), 500))