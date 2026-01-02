import { useState, useEffect } from 'react';
import { NotificationService } from '../services/notifications.service';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refresh = async () => {
    const data = await NotificationService.fetchNotifications();
    setNotifications(data);
    const count = await NotificationService.getUnreadCount();
    setUnreadCount(count.count);
  };

  return { notifications, unreadCount, refresh };
};