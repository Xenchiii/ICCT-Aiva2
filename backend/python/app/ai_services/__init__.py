from .aiva_assistant import AivaAssistant
from .analytics import AnalyticsEngine
from .auto_grader import AutoGrader
from .face_recognition import FaceRecognizer
from .plagiarism_detector import PlagiarismDetector
from .predictions import GradePredictor
from .proctoring import ProctoringAI

# This list defines what happens when you type: "from ai_services import *"
__all__ = [
    'AivaAssistant',
    'AnalyticsEngine',
    'AutoGrader',
    'FaceRecognizer',
    'PlagiarismDetector',
    'GradePredictor',
    'ProctoringAI'
]