import { ApiService } from './api.service';

export const ProctoringService = {
  startSession: (examId: string) => ApiService.request(`/proctor/${examId}/start`, { method: 'POST' }),
  logViolation: (examId: string, type: string) => 
    ApiService.request(`/proctor/${examId}/log`, { method: 'POST', body: JSON.stringify({ type, timestamp: new Date() }) }),
};