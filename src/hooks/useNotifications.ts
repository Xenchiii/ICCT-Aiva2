import { useState, useEffect } from 'react';
import { NotificationService, Notification } from '../services/notification.service';

export const useNotifications = () => {
  // FIX: Added <Notification[]> type so TS knows what this array contains
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refresh = async () => {
    try {
      // FIX: Changed 'fetchNotifications' to 'getAll' to match your Service
      const data = await NotificationService.getAll();
      setNotifications(data);

      const countWrapper = await NotificationService.getUnreadCount();
      setUnreadCount(countWrapper.count);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  };

  // FIX: Used useEffect to actually load data when the page opens
  useEffect(() => {
    refresh();
  }, []);

  return { notifications, unreadCount, refresh };
};