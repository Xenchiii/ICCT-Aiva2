import { ApiService } from './api.service';

export const AiService = {
  predictSuccess: (studentData: object) => 
    ApiService.request('/ai/predict-grade', { method: 'POST', body: JSON.stringify(studentData) }),
  askTutor: (question: string) => 
    ApiService.request('/ai/tutor', { method: 'POST', body: JSON.stringify({ question }) }),
};