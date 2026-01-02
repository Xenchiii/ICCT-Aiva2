class ProctoringAI:
    def analyze_behavior(self, session_data):
        """Simulates analyzing student behavior during a quiz"""
        return {
            "alert_level": "LOW",
            "events": [
                {"timestamp": "10:15:00", "type": "TAB_SWITCH", "details": "User switched tabs for 3s"},
                {"timestamp": "10:22:30", "type": "NO_FACE", "details": "Face temporarily left frame"}
            ]
        }