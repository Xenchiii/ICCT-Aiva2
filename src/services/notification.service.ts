import { ApiService } from './api.service';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  timestamp: string;
}

export const NotificationService = {
  // Get all notifications for the logged-in student
  getAll: () => ApiService.request<Notification[]>('/notifications'),

  // Get only unread count for the navbar badge
  getUnreadCount: () => ApiService.request<{ count: number }>('/notifications/unread-count'),

  // Mark a specific notification as read
  markAsRead: (id: string) => 
    ApiService.request(`/notifications/${id}/read`, { method: 'PATCH' }),

  // Clear all notifications
  markAllAsRead: () => 
    ApiService.request('/notifications/read-all', { method: 'PATCH' }),

  // Delete a notification
  delete: (id: string) => 
    ApiService.request(`/notifications/${id}`, { method: 'DELETE' }),
};