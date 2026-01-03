import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext<any>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const addNotification = (notif: any) => {
    // Logic for prioritized alerts based on urgency
    setNotifications(prev => [notif, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};