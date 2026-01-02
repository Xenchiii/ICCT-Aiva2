import random

class AivaAssistant:
    def generate_response(self, message):
        """Simulates the Chatbot logic"""
        msg = message.lower()
        
        if "grade" in msg:
            return "Based on your current performance, your predicted GWA is 1.25. Keep up the good work in IT 302!"
        elif "quiz" in msg:
            return "I can generate a practice quiz for Data Structures. Would you like to start with 'Linked Lists'?"
        elif "schedule" in msg:
            return "You have a class at 10:00 AM in Lab 4. Don't be late!"
        else:
            responses = [
                "I'm here to help you study. What topic should we focus on?",
                "That's an interesting question. Let me check the student handbook.",
                "I can help you review for your upcoming finals."
            ]
            return random.choice(responses)