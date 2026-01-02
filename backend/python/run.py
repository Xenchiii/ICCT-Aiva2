from flask import Flask
from flask_cors import CORS
from routes.ai_routes import ai_bp
from routes.analytics_routes import analytics_bp

app = Flask(__name__)
CORS(app) # Allow your React frontend to talk to this Python backend

# Register Blueprints (Routes)
app.register_blueprint(ai_bp, url_prefix='/api/ai')
app.register_blueprint(analytics_bp, url_prefix='/api/analytics')

if __name__ == '__main__':
    print("🧠 ICCT AIVA AI Engine Running on http://localhost:5000")
    app.run(debug=True, port=5000)