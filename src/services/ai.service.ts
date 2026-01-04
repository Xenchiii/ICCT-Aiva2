import { ApiService } from './api.service';

export const AiService = {
  predictSuccess: (studentData: object) => 
    ApiService.request('/ai/predict-grade', { method: 'POST', body: JSON.stringify(studentData) }),

  askTutor: (question: string) => 
    ApiService.request('/ai/tutor', { method: 'POST', body: JSON.stringify({ question }) }),

  // FIX: Added this method because useFaceRecognition.ts calls it!
  verifyIdentity: async (imageBlob: Blob) => {
    // We use FormData to send files/images properly
    const formData = new FormData();
    formData.append('face_image', imageBlob);

    // Call the backend (Assuming your ApiService handles FormData)
    return ApiService.request('/ai/verify-identity', { 
      method: 'POST', 
      body: formData 
    });
  }
};