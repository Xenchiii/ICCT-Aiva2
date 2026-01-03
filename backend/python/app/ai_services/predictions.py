import numpy as np # pyright: ignore[reportMissingImports]
from sklearn.linear_model import LinearRegression # pyright: ignore[reportMissingModuleSource]

class GradePredictor:
    def __init__(self):
        self.model = LinearRegression()

    def forecast(self, grades_data):
        """
        Trains a quick model on the student's past grades to predict the next one.
        Input: grades_data = [85, 88, 90] (Quiz, Midterm, etc.)
        """
        if not grades_data or len(grades_data) < 2:
            return {"error": "Not enough data to predict trends (need at least 2 grades)."}

        # 1. Prepare Data
        # X = Time steps (1, 2, 3...), y = Score
        y = np.array(grades_data)
        X = np.array(range(len(grades_data))).reshape(-1, 1)

        # 2. Train Model (Fit line to data)
        self.model.fit(X, y)

        # 3. Predict Next Score (The next integer in the sequence)
        next_index = np.array([[len(grades_data)]])
        predicted_score = self.model.predict(next_index)[0]

        # 4. Calculate Trend Slope
        slope = self.model.coef_[0]
        trend = "IMPROVING" if slope > 0 else "DECLINING"

        return {
            "current_average": round(np.mean(y), 2),
            "predicted_next_grade": round(min(100, max(0, predicted_score)), 2), # Clamp between 0-100
            "trend": trend,
            "slope": round(slope, 4)
        }