import uuid
from datetime import datetime
import re

def generate_request_id():
    """
    Generates a unique ID (UUID) for tracking specific API requests.
    Useful for debugging logs.
    """
    return str(uuid.uuid4())

def get_current_timestamp():
    """
    Returns the current server time in ISO 8601 format.
    Example: 2026-01-02T10:30:00.123456
    """
    return datetime.now().isoformat()

def format_response(data, message="Success", status=200):
    """
    Standardizes the JSON structure for all API responses.
    This ensures the frontend always receives the same format.
    """
    return {
        "status": status,
        "message": message,
        "timestamp": get_current_timestamp(),
        "data": data,
        "request_id": generate_request_id()
    }

def sanitize_text(text):
    """
    Basic security cleaning to remove script tags and extra whitespace.
    Prevents simple XSS (Cross-Site Scripting) attempts.
    """
    if not text:
        return ""
    
    # Remove <script> tags and their content
    clean_text = re.sub(r'<script.*?>.*?</script>', '', text, flags=re.IGNORECASE | re.DOTALL)
    
    # Remove leading/trailing whitespace
    return clean_text.strip()