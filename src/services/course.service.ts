// course.service.ts
import { ApiService } from './api.service';

export const CourseService = {
  getAll: () => ApiService.request('/courses'),
  getById: (id: string) => ApiService.request(`/courses/${id}`),
  getEnrolled: () => ApiService.request('/courses/enrolled'),
};