def format_timestamp(ts):
    """Utility to format time for logs"""
    return ts.strftime("%Y-%m-%d %H:%M:%S")

def sanitize_input(text):
    """Basic cleaning of text input"""
    return text.strip()