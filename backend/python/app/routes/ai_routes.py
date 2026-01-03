from flask import Blueprint, request, jsonify # pyright: ignore[reportMissingImports]
from ai_services import (
    AivaAssistant, 
    FaceRecognizer, 
    ProctoringAI, 
    AutoGrader, 
    PlagiarismDetector
)
from utils.helpers import format_response

ai_bp = Blueprint('ai_routes', __name__)

# Initialize Services
assistant = AivaAssistant()
face_rec = FaceRecognizer()
proctor = ProctoringAI()
grader = AutoGrader()
plagiarism = PlagiarismDetector()

@ai_bp.route('/chat', methods=['POST'])
def chat():
    """Endpoint for the AI Chatbot"""
    try:
        data = request.json
        message = data.get('message', '')
        response = assistant.generate_response(message)
        return jsonify(format_response({"reply": response}))
    except Exception as e:
        return jsonify(format_response(None, str(e), 500))

@ai_bp.route('/verify-face', methods=['POST'])
def verify_face():
    """Endpoint for Biometric Login"""
    try:
        data = request.json
        image_data = data.get('image', '')
        result = face_rec.verify_identity(image_data)
        return jsonify(format_response(result))
    except Exception as e:
        return jsonify(format_response(None, str(e), 500))

@ai_bp.route('/proctor-check', methods=['POST'])
def check_behavior():
    """Endpoint for Real-time Exam Proctoring"""
    try:
        data = request.json
        # Expects 'image' in the payload
        result = proctor.analyze_behavior(data)
        return jsonify(format_response(result))
    except Exception as e:
        return jsonify(format_response(None, str(e), 500))

@ai_bp.route('/grade-essay', methods=['POST'])
def grade_essay():
    """Endpoint for Auto-Grading Essays"""
    try:
        data = request.json
        text = data.get('text', '')
        result = grader.grade_essay(text)
        return jsonify(format_response(result))
    except Exception as e:
        return jsonify(format_response(None, str(e), 500))

@ai_bp.route('/check-plagiarism', methods=['POST'])
def check_plagiarism():
    """Endpoint for Document Similarity Check"""
    try:
        data = request.json
        text = data.get('text', '')
        result = plagiarism.check_content(text)
        return jsonify(format_response(result))
    except Exception as e:
        return jsonify(format_response(None, str(e), 500))