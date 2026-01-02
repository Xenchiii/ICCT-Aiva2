import { ApiService } from './api.service';

export const AttendanceService = {
  checkIn: (courseId: string, qrCode: string) => 
    ApiService.request('/attendance/scan', { method: 'POST', body: JSON.stringify({ courseId, qrCode }) }),
  getReport: () => ApiService.request('/attendance/my-report'),
};