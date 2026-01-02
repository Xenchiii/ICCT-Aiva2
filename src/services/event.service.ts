// event.service.ts
import { ApiService } from './api.service';

export const EventService = {
  getAcademicCalendar: () => ApiService.request('/events/calendar'),
  getUpcomingExams: () => ApiService.request('/events/exams'),
};