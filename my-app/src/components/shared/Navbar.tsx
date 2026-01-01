import { useState } from 'react';
import { BookOpen, Bell, Sun, Moon, X } from 'lucide-react';

interface NotificationItem {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

interface Props {
  currentUser: any;
  notifications: NotificationItem[];
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  addNotification?: (message: string) => void;
  setNotifications?: (notifs: NotificationItem[]) => void;
}

export default function Navbar({
  currentUser,
  notifications,
  darkMode,
  setDarkMode,
  addNotification,
  setNotifications
}: Props) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const defaultAvatar = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%236366f1"/%3E%3Ctext x="50" y="65" font-size="40" fill="white" text-anchor="middle"%3EU%3C/text%3E%3C/svg%3E';
  
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (addNotification) {
      addNotification(`Switched to ${!darkMode ? 'dark' : 'light'} mode 🌓`);
    }
  };

  const handleClearNotifications = () => {
    if (setNotifications) {
      setNotifications([]);
    }
    if (addNotification) {
      addNotification('All notifications cleared ✨');
    }
    setShowNotifications(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Get role-based gradient and label
  const getRoleConfig = () => {
    switch (currentUser?.role) {
      case 'admin':
        return {
          gradient: 'from-red-600 to-rose-600',
          label: 'Admin Portal',
          ringColor: 'ring-red-500 hover:ring-red-400'
        };
      case 'teacher':
        return {
          gradient: 'from-green-600 to-emerald-600',
          label: 'Teacher Dashboard',
          ringColor: 'ring-green-500 hover:ring-green-400'
        };
      default:
        return {
          gradient: 'from-blue-600 to-purple-600',
          label: 'Student Portal',
          ringColor: 'ring-blue-500 hover:ring-blue-400'
        };
    }
  };

  const roleConfig = getRoleConfig();

  return (
    <nav className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border-b px-4 py-3 sticky top-0 z-50 shadow-sm transition-colors`}>
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Left: Logo & Brand */}
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${roleConfig.gradient} rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform`}>
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold bg-gradient-to-r ${roleConfig.gradient} bg-clip-text text-transparent`}>
              ICCTutor Link
            </h1>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {roleConfig.label}
            </p>
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center space-x-2">
          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2.5 rounded-lg transition-all ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              } ${showNotifications ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-white dark:ring-gray-800"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-96 rounded-xl shadow-2xl border overflow-hidden ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } z-50 animate-fadeIn`}>
                {/* Header */}
                <div className={`p-4 border-b ${
                  darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-100 bg-gray-50'
                } flex items-center justify-between`}>
                  <div>
                    <h3 className="font-semibold text-lg">Notifications</h3>
                    {unreadCount > 0 && (
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {unreadCount} unread
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                    }`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <Bell className={`h-8 w-8 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                      </div>
                      <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                        No notifications
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        You're all caught up!
                      </p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b transition-colors ${
                          darkMode 
                            ? 'border-gray-700 hover:bg-gray-750' 
                            : 'border-gray-100 hover:bg-gray-50'
                        } ${!notif.read ? (darkMode ? 'bg-blue-900/20' : 'bg-blue-50/50') : ''}`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notif.read 
                              ? (darkMode ? 'bg-gray-600' : 'bg-gray-300')
                              : 'bg-blue-600'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                              {notif.message}
                            </p>
                            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                              {notif.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className={`p-3 border-t text-center ${
                    darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-100 bg-gray-50'
                  }`}>
                    <button
                      onClick={handleClearNotifications}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                    >
                      Clear all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={handleToggleDarkMode}
            className={`p-2.5 rounded-lg transition-all ${
              darkMode 
                ? 'hover:bg-gray-700 text-yellow-400 hover:text-yellow-300' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Profile Section */}
          <div className={`flex items-center space-x-3 pl-3 ml-2 border-l ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <img
              src={currentUser?.avatar_url || defaultAvatar}
              className={`w-9 h-9 rounded-full ring-2 transition-all hover:ring-4 ${roleConfig.ringColor} object-cover cursor-pointer`}
              alt={currentUser?.name || 'User'}
              title="View Profile"
            />
            <div className="hidden md:block">
              <p className={`text-sm font-semibold ${
                darkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                {currentUser?.name || 'User'}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} capitalize`}>
                {currentUser?.role || 'Student'} • Level {currentUser?.level || 1}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        ></div>
      )}
    </nav>
  );
}