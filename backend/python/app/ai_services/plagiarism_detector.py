from sklearn.feature_extraction.text import TfidfVectorizer # pyright: ignore[reportMissingModuleSource]
from sklearn.metrics.pairwise import cosine_similarity # pyright: ignore[reportMissingModuleSource]

class PlagiarismDetector:
    def __init__(self):
        # In a real production app, this would connect to a massive DB of papers.
        # For this microservice, we load a small local corpus.
        self.knowledge_base = [
            "React is a JavaScript library for building user interfaces.",
            "Machine learning is a field of inquiry devoted to understanding and building methods that 'learn'.",
            "The mitochondrion is a double-membrane-bound organelle found in most eukaryotic organisms.",
            "Photosynthesis is the process used by plants to convert light energy into chemical energy."
        ]

    def check_content(self, input_text):
        """
        Compares input_text against the knowledge_base using Cosine Similarity.
        """
        if not input_text:
            return {"score": 0, "status": "CLEAN"}

        # 1. Add input text to the corpus to vectorize together
        documents = [input_text] + self.knowledge_base

        # 2. Vectorize (Convert text to numbers based on word frequency)
        tfidf_vectorizer = TfidfVectorizer()
        tfidf_matrix = tfidf_vectorizer.fit_transform(documents)

        # 3. Calculate Similarity (Compare Input [0] vs All others in KB)
        # [0:1] selects the first row (our input)
        cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix)
        
        # The first match is itself (1.0), so we slice [0][1:] to look at the others
        matches = cosine_sim[0][1:] 
        
        if len(matches) == 0:
            return {"similarity_score": 0, "status": "CLEAN"}

        highest_score = matches.max()

        # 4. Determine Status
        score_percent = round(highest_score * 100, 2)
        
        if score_percent > 80:
            status = "CRITICAL COPY"
        elif score_percent > 30:
            status = "FLAGGED"
        else:
            status = "CLEAN"

        return {
            "similarity_score": score_percent,
            "status": status,
            "highest_match_index": int(matches.argmax()) # Index of the doc it matched
        }