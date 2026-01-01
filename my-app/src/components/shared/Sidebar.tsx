import { Home, Users, Video, Library, BarChart3, MessageCircle, User, LogOut, GraduationCap, Medal, Trophy, Gamepad2, Calendar, Activity, Shield, Settings, Database, Bell, FileText, Award } from 'lucide-react';

interface Props {
  currentUser: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  darkMode: boolean;
  onLogout: () => void;
}

export default function Sidebar({
  currentUser,
  activeTab,
  setActiveTab,
  sidebarCollapsed,
  setSidebarCollapsed,
  darkMode,
  onLogout
}: Props) {
  const studentNav = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'classes', label: 'Classes', icon: Video },
    { id: 'badges', label: 'Badges', icon: Medal },
    { id: 'gamification', label: 'Gamification', icon: Trophy },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'resources', label: 'Resources', icon: Library },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'calendar', label: 'Schedule', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const teacherNav = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'classes', label: 'Classes', icon: Video },
    { id: 'resources', label: 'Resources', icon: Library },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const adminNav = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'teachers', label: 'Teachers', icon: Award },
    { id: 'classes', label: 'Classes', icon: Video },
    { id: 'resources', label: 'Resources', icon: Library },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'system', label: 'System Health', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const getNavItems = () => {
    if (currentUser?.role === 'admin') return adminNav;
    if (currentUser?.role === 'teacher') return teacherNav;
    return studentNav;
  };

  const navItems = getNavItems();

  const getGradient = () => {
    if (currentUser?.role === 'admin') return 'from-red-600 to-rose-600';
    if (currentUser?.role === 'teacher') return 'from-green-600 to-emerald-600';
    return 'from-blue-600 to-purple-600';
  };

  const getRoleIcon = () => {
    if (currentUser?.role === 'admin') return Shield;
    if (currentUser?.role === 'teacher') return Award;
    return GraduationCap;
  };

  const RoleIcon = getRoleIcon();

  return (
    <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} min-h-screen border-r transition-all duration-300 flex flex-col`}>
      {/* Header */}
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${getGradient()}`}>
                <RoleIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {currentUser?.name || 'User'}
                </h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>
                  {currentUser?.role || 'Student'}
                </p>
              </div>
            </div>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)} 
            className={`p-2 rounded-lg transition-all duration-300 ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
            title={sidebarCollapsed ? 'Expand' : 'Collapse'}
          >
            <span className={`text-lg transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`}>
              ←
            </span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
        <nav className="space-y-1">
          {navItems.map((item, index) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)} 
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'space-x-3 px-4'} py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === item.id 
                  ? `bg-gradient-to-r ${getGradient()} text-white shadow-lg`
                  : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700')
              }`}
              style={{ 
                animationDelay: `${index * 30}ms`,
                animation: 'slideIn 0.3s ease-out forwards'
              }}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Footer - Logout */}
      <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button 
          onClick={onLogout} 
          className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'space-x-3 px-4'} py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            darkMode 
              ? 'hover:bg-red-900/30 text-red-400 hover:text-red-300' 
              : 'hover:bg-red-50 text-red-600 hover:text-red-700'
          }`}
          title={sidebarCollapsed ? 'Logout' : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!sidebarCollapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}