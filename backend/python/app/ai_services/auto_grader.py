class AutoGrader:
    def grade_essay(self, text):
        """Simulates NLP grading of an essay"""
        word_count = len(text.split())
        
        if word_count < 50:
            return {"score": 70, "feedback": "Too short. Please expand on your main points."}
        
        return {
            "score": 92,
            "feedback": "Excellent structure. Your argument about Cloud Computing was very persuasive.",
            "grammar_issues": 2
        }