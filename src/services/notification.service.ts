import { ApiService } from './api.service';

// 1. Export the Interface
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  timestamp: string;
}

// 2. Export the Service Object
export const NotificationService = {
  // Get all notifications
  getAll: () => ApiService.request<Notification[]>('/notifications'),

  // Get unread count
  getUnreadCount: () => ApiService.request<{ count: number }>('/notifications/unread-count'),

  // Mark specific as read
  markAsRead: (id: string) => 
    ApiService.request(`/notifications/${id}/read`, { method: 'PATCH' }),

  // Mark all as read
  markAllAsRead: () => 
    ApiService.request('/notifications/read-all', { method: 'PATCH' }),

  // Delete notification
  delete: (id: string) => 
    ApiService.request(`/notifications/${id}`, { method: 'DELETE' }),
};