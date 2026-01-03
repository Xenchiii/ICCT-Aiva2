# ai/models/__init__.py

class StudentSubmission:
    def __init__(self, student_id, text, subject):
        self.student_id = student_id
        self.text = text
        self.subject = subject

class GradeEntry:
    def __init__(self, student_id, score, type):
        self.student_id = student_id
        self.score = score
        self.type = type # Quiz, Exam, Project

class ProctorSession:
    def __init__(self, session_id, student_id, start_time):
        self.session_id = session_id
        self.student_id = student_id
        self.start_time = start_time
        self.flags = []