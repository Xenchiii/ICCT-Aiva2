from flask import Flask # type: ignore
from flask_cors import CORS # type: ignore
from routes.ai_routes import ai_bp # pyright: ignore[reportMissingImports]
from routes.analytics_routes import analytics_bp # pyright: ignore[reportMissingImports]

# Initialize the Flask application
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing)
# This allows your React Frontend (http://localhost:5173) to send requests to this Python Backend
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register the Blueprints (The routes we defined in the 'routes' folder)
app.register_blueprint(ai_bp, url_prefix='/api/ai')
app.register_blueprint(analytics_bp, url_prefix='/api/analytics')

# Basic Health Check Route
@app.route('/', methods=['GET'])
def health_check():
    return "🧠 ICCT Aiva AI Microservice is Running! 🚀"

if __name__ == '__main__':
    print("--- Starting ICCT Aiva AI Engine ---")
    print("--- Listening on http://localhost:5000 ---")
    # Debug=True allows the server to auto-reload when you save changes
    app.run(debug=True, port=5000)