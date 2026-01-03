import cv2 # pyright: ignore[reportMissingImports]
import numpy as np # pyright: ignore[reportMissingImports]
import base64

class ProctoringAI:
    def __init__(self):
        self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        self.eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

    def analyze_behavior(self, image_payload):
        """
        Detects cheating behaviors: Looking away, No face, or Multiple faces.
        Expects base64 image string.
        """
        try:
            # 1. Decode Image
            image_data = image_payload.get('image', '')
            if "," in image_data:
                image_data = image_data.split(",")[1]
            
            img_bytes = base64.b64decode(image_data)
            nparr = np.frombuffer(img_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            # 2. Detect Faces
            faces = self.face_cascade.detectMultiScale(gray, 1.3, 5)

            alerts = []
            status = "CLEAN"

            if len(faces) == 0:
                alerts.append("No face detected. Student left the frame.")
                status = "FLAGGED"
            elif len(faces) > 1:
                alerts.append(f"Multiple faces detected ({len(faces)}). Potential collusion.")
                status = "FLAGGED"
            else:
                # 3. Basic Gaze/Head Check (Center of frame)
                # If face is too far to the edge, assume looking away
                for (x, y, w, h) in faces:
                    height, width = img.shape[:2]
                    face_center_x = x + w / 2
                    
                    if face_center_x < width * 0.2 or face_center_x > width * 0.8:
                        alerts.append("Student looking away from screen.")
                        status = "WARNING"

            return {
                "status": status,
                "face_count": len(faces),
                "alerts": alerts
            }

        except Exception as e:
            return {"status": "ERROR", "message": str(e)}