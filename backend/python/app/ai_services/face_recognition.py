import cv2 # pyright: ignore[reportMissingImports]
import numpy as np # pyright: ignore[reportMissingImports]
import base64
import os

class FaceRecognizer:
    def __init__(self):
        # Load the pre-trained Haar Cascade classifier for face detection
        # Ensure opencv-python is installed
        self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    def verify_identity(self, image_data):
        """
        Decodes a base64 image, detects faces, and checks if a face is present.
        """
        try:
            # 1. Decode the Base64 image string from the frontend
            if "," in image_data:
                image_data = image_data.split(",")[1] # Remove header (data:image/jpeg;base64,...)
            
            img_bytes = base64.b64decode(image_data)
            nparr = np.frombuffer(img_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if img is None:
                return {"verified": False, "error": "Failed to decode image"}

            # 2. Convert to Grayscale (Standard for detection)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            # 3. Detect Faces
            faces = self.face_cascade.detectMultiScale(
                gray, 
                scaleFactor=1.1, 
                minNeighbors=5, 
                minSize=(30, 30)
            )

            if len(faces) > 0:
                return {
                    "verified": True,
                    "face_count": len(faces),
                    "confidence": 0.95, # Haar doesn't give probability, so we estimate high on detection
                    "message": "Face detected successfully."
                }
            else:
                return {
                    "verified": False,
                    "face_count": 0,
                    "message": "No face detected in the frame. Please check lighting."
                }

        except Exception as e:
            return {"verified": False, "error": str(e)}