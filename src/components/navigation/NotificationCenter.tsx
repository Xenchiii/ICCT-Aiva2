import React, { useState, useEffect } from 'react';
import './NotificationCenter.css';
import { Bell, Check } from 'lucide-react';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading effect for school demo
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    } else {
      setLoading(true);
    }
  }, [isOpen]);

  return (
    <div className="notification-container">
      <button 
        className="icon-btn hover-lift click-shrink" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell size={20} />
        <span className="badge pulse">2</span>
      </button>

      {isOpen && (
        <div className="notification-dropdown reveal-scale">
          <div className="notif-header">
            <h4>Notifications</h4>
            <button className="mark-read-btn">Mark all as read</button>
          </div>
          
          <div className="notif-list">
            {loading ? (
              // Skeleton Screens
              [1, 2, 3].map((i) => (
                <div key={i} className="notif-item skeleton-wrapper">
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-subtext"></div>
                </div>
              ))
            ) : (
              // Actual Content
              <>
                <div className="notif-item unread reveal-fade">
                  <div className="notif-content">
                    <p><strong>Grade updated:</strong> CS101 - Intro to Computing</p>
                    <span>2 minutes ago</span>
                  </div>
                  <div className="status-dot"></div>
                </div>
                
                <div className="notif-item reveal-fade">
                  <div className="notif-content">
                    <p><strong>GWA Goal Reached!</strong> You are now at 1.25 🎉</p>
                    <span>1 hour ago</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="notif-footer">
            <button>View all notifications</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;