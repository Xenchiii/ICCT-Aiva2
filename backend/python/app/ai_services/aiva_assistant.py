from textblob import TextBlob # pyright: ignore[reportMissingImports]

class AivaAssistant:
    def generate_response(self, message):
        """
        Uses NLP to understand intent and sentiment.
        """
        if not message:
            return "I am listening. How can I help you?"

        blob = TextBlob(message)
        sentiment = blob.sentiment.polarity # -1 (Negative) to +1 (Positive)
        nouns = blob.noun_phrases
        msg_lower = message.lower()

        # 1. Sentiment Guard (Detect frustration)
        if sentiment < -0.3:
            return "I sense some frustration. Would you like me to open a support ticket for you?"

        # 2. Intent Recognition (Keywords + Nouns)
        if "grade" in msg_lower or "score" in msg_lower:
            return "I can access your academic records. Are you looking for your IT 302 or CS 201 grades?"
        
        if "schedule" in msg_lower or "class" in msg_lower:
            return "Checking your calendar... You have 'Data Structures' tomorrow at 10:00 AM."

        if "enroll" in msg_lower:
            return "Enrollment is currently open. I can guide you to the Registrar module."

        # 3. Dynamic Fallback based on extracted nouns
        if nouns:
            return f"I see you are asking about {', '.join(nouns)}. Let me search the student handbook for that topic."

        return "I am Aiva, your academic assistant. You can ask me about grades, schedules, or enrollment."