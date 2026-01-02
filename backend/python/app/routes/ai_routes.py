from flask import Blueprint, request, jsonify
from ai_services.aiva_assistant import AivaAssistant
from ai_services.face_recognition import FaceRecognizer
from ai_services.proctoring import ProctoringAI
from ai_services.auto_grader import AutoGrader

ai_bp = Blueprint('ai_routes', __name__)

assistant = AivaAssistant()
face_rec = FaceRecognizer()
proctor = ProctoringAI()
grader = AutoGrader()

@ai_bp.route('/chat', methods=['POST'])
def chat():
    data = request.json
    response = assistant.generate_response(data.get('message', ''))
    return jsonify({"reply": response})

@ai_bp.route('/verify-face', methods=['POST'])
def verify_face():
    # Accepts an image payload (simulated)
    result = face_rec.verify_identity(request.json.get('image'))
    return jsonify(result)

@ai_bp.route('/proctor-check', methods=['POST'])
def check_behavior():
    result = proctor.analyze_behavior(request.json)
    return jsonify(result)

@ai_bp.route('/grade-essay', methods=['POST'])
def grade_essay():
    text = request.json.get('text', '')
    result = grader.grade_essay(text)
    return jsonify(result)