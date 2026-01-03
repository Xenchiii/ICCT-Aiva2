import numpy as np # pyright: ignore[reportMissingImports]

class AnalyticsEngine:
    def get_class_performance(self, grades_list):
        """
        Input: List of dictionaries [{'student': 'Name', 'grade': 85}, ...]
        """
        if not grades_list:
            return {"error": "No data provided"}

        # Extract numerical grades
        scores = np.array([g['grade'] for g in grades_list])

        # Calculate Statistics
        avg = np.mean(scores)
        median = np.median(scores)
        std_dev = np.std(scores)
        highest = np.max(scores)
        lowest = np.min(scores)

        # Identify Outliers (Students significantly struggling)
        # Any score < (Mean - 1.5 * StdDev)
        threshold = avg - (1.5 * std_dev)
        at_risk = [g for g in grades_list if g['grade'] < threshold]

        return {
            "class_average": round(avg, 2),
            "median_score": round(median, 2),
            "standard_deviation": round(std_dev, 2),
            "highest_score": int(highest),
            "lowest_score": int(lowest),
            "students_at_risk": at_risk,
            "pass_rate": f"{round((np.sum(scores >= 75) / len(scores)) * 100, 1)}%"
        }

    def get_student_engagement(self, login_logs):
        """
        Analyzes login frequency to determine engagement velocity.
        """
        # Simple velocity check: Logins per week
        total_logins = len(login_logs)
        if total_logins > 20:
            level = "HIGH"
        elif total_logins > 5:
            level = "MODERATE"
        else:
            level = "LOW (At Risk)"

        return {
            "total_logins": total_logins,
            "engagement_level": level,
            "velocity": f"{round(total_logins / 7, 1)} logins/day" # Assuming 1 week of data
        }