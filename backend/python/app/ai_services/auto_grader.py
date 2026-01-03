from textblob import TextBlob # pyright: ignore[reportMissingImports]
import nltk # pyright: ignore[reportMissingImports]

# Download necessary NLTK data (run this once or include in startup script)
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

class AutoGrader:
    def __init__(self):
        # Keywords expected in a good answer (Dynamic in a real app)
        self.required_keywords = ["algorithm", "efficiency", "structure", "data", "complexity"]

    def grade_essay(self, text):
        """
        Analyzes text for grammar, length, and keyword relevance.
        """
        if not text:
            return {"score": 0, "feedback": "No text provided."}

        blob = TextBlob(text)
        words = blob.words
        word_count = len(words)

        # 1. Scoring Logic
        score = 0
        
        # Length Check (Max 30 pts)
        if word_count > 100: score += 30
        elif word_count > 50: score += 15
        else: score += 5

        # Keyword Matching (Max 40 pts)
        matches = [word for word in words if word.lower() in self.required_keywords]
        match_score = min(40, len(matches) * 10) 
        score += match_score

        # Grammar/Complexity (Max 30 pts)
        # Using sentence length as a proxy for complexity
        avg_sentence_len = sum(len(s.words) for s in blob.sentences) / len(blob.sentences) if blob.sentences else 0
        if avg_sentence_len > 10: score += 30
        elif avg_sentence_len > 5: score += 15

        # 2. Generate Feedback
        feedback = []
        if match_score < 20:
            feedback.append("Try to include more technical terms like 'algorithm' or 'complexity'.")
        if word_count < 50:
            feedback.append("Your answer is too short. Please expand on your points.")
        if not feedback:
            feedback.append("Excellent answer! Well structured and relevant.")

        return {
            "score": min(100, score),
            "word_count": word_count,
            "keyword_matches": list(set(matches)), # Unique matches
            "sentiment": "Positive" if blob.sentiment.polarity > 0 else "Neutral/Negative",
            "feedback": " ".join(feedback)
        }