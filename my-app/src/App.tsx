import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components
import AuthForm from './components/auth/AuthForm';
import GoogleCallback from './components/auth/GoogleCallback';
import Navbar from './components/shared/Navbar';
import Sidebar from './components/shared/Sidebar';
import Classes from './components/dashboard/Classes';

// Import dashboards
import StudentDashboard from './components/dashboard/StudentDashboard';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';

// Import teacher components
import TeacherStudents from './components/teacher/TeacherStudents';
import TeacherClasses from './components/teacher/TeacherClasses';
import TeacherAnalytics from './components/teacher/TeacherAnalytics';

// Import student components
import Badges from './components/student/Badges';
import Gamification from './components/student/Gamification';
import Resources from './components/student/Resources';
import Messages from './components/student/Messages';
import Games from './components/student/Games';
import Profile from './components/student/Profile';
import Teachers from './components/student/Teachers';
import StudentActivities from './components/student/StudentActivities';

// Import modals
import SettingsModal from './components/modals/SettingsModal';

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  level?: number;
  points?: number;
  streak?: number;
  studentNo?: string;
  course?: string;
  teacherNo?: string;
  avatar_url?: string;
}

interface NotificationItem {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

// Main App Content Component (Wrapper for authenticated content)
function AppContent() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // UI state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Data state
  const [badges, setBadges] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  
  // Teacher-specific state
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>({});
  
  // Modal states
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Check for existing session on component mount
  useEffect(() => {
    const token = sessionStorage.getItem('auth_token');
    const userData = sessionStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('user_data');
      }
    }
  }, []);

  // API helper function
  const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    try {
      const token = sessionStorage.getItem('auth_token');
      const headers: any = {
        'Content-Type': 'application/json',
        ...options.headers,
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  // Load data based on user role
  const loadData = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    
    try {
      if (currentUser.role === 'admin') {
        console.log('Admin dashboard loaded');
      } else if (currentUser.role === 'teacher') {
        const [studentsData, classesData, assignmentsData, analyticsData, resourcesData] = await Promise.all([
          apiRequest('/teacher/students').catch(() => []),
          apiRequest('/teacher/classes').catch(() => []),
          apiRequest('/teacher/assignments').catch(() => []),
          apiRequest('/teacher/analytics').catch(() => ({})),
          apiRequest('/resources').catch(() => [])
        ]);
        
        setStudents(studentsData || []);
        setClasses(classesData || []);
        setAssignments(assignmentsData || []);
        setAnalytics(analyticsData || {});
        setResources(resourcesData || []);
      } else {
        const [badgesData, challengesData, rewardsData, teachersData, resourcesData] = await Promise.all([
          apiRequest('/badges').catch(() => []),
          apiRequest('/challenges').catch(() => []),
          apiRequest('/rewards').catch(() => []),
          apiRequest('/teachers').catch(() => []),
          apiRequest('/resources').catch(() => [])
        ]);
        
        setBadges(badgesData || []);
        setChallenges(challengesData || []);
        setRewards(rewardsData || []);
        setTeachers(teachersData || []);
        setResources(resourcesData || []);
      }
      
      const messagesData = await apiRequest('/messages').catch(() => []);
      setMessages(messagesData || []);
      
      const notificationsData = await apiRequest('/notifications').catch(() => []);
      setNotifications(notificationsData || []);
    } catch (error) {
      console.error('Failed to load data:', error);
      addNotification('Failed to load some data. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      loadData();
    }
  }, [isAuthenticated, currentUser?.id]);

  const addNotification = (message: string) => {
    const newNotif: NotificationItem = {
      id: Date.now().toString(),
      message,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleLogin = (user: User) => {
    console.log('🔐 Login handler received user:', user);
    console.log('🎭 User role:', user.role);
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    addNotification(`🎉 Welcome back, ${user.name}!`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user_data');
    sessionStorage.removeItem('google_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
    addNotification('👋 Logged out successfully');
  };

  const renderContent = () => {
    if (!currentUser) return null;
    
    console.log('📄 Rendering content for role:', currentUser?.role, '| activeTab:', activeTab);
    
    // ADMIN ROUTES
    if (currentUser.role === 'admin') {
      console.log('🛡️ Rendering ADMIN content for tab:', activeTab);
      
      if (activeTab === 'profile') {
        return <Profile 
          currentUser={currentUser}
          badges={badges}
          darkMode={darkMode}
          setShowSettingsModal={setShowSettingsModal}
        />;
      }
      
      if (activeTab === 'classes') {
        return <Classes 
          currentUser={currentUser} 
          darkMode={darkMode}
          apiEndpoint="/api"
        />;
      }
      
      return <AdminDashboard 
        currentUser={currentUser} 
        darkMode={darkMode}
        activeTab={activeTab}
      />;
    }
    
    // TEACHER ROUTES
    if (currentUser.role === 'teacher') {
      console.log('👨‍🏫 Rendering TEACHER content for tab:', activeTab);
      
      switch (activeTab) {
        case 'dashboard':
          return <TeacherDashboard 
            currentUser={currentUser}
            students={students}
            classes={classes}
            assignments={assignments}
            resources={resources}
            darkMode={darkMode}
          />;
        case 'students':
          return <TeacherStudents 
            students={students}
            darkMode={darkMode}
            setActiveTab={setActiveTab}
          />;
        case 'classes':
          return <TeacherClasses 
            classes={classes}
            setClasses={setClasses}
            darkMode={darkMode}
          />;
        case 'analytics':
          return <TeacherAnalytics 
            students={students}
            classes={classes}
            assignments={assignments}
            analytics={analytics}
            messages={messages}
            resources={resources}
            darkMode={darkMode}
          />;
        case 'resources':
          return <Resources 
            resources={resources}
            setResources={setResources}
            darkMode={darkMode}
          />;
        case 'messages':
          return <Messages 
            messages={messages}
            teachers={teachers}
            students={students}
            currentUser={currentUser}
            darkMode={darkMode}
          />;
        case 'profile':
          return <Profile 
            currentUser={currentUser}
            badges={badges}
            darkMode={darkMode}
            setShowSettingsModal={setShowSettingsModal}
          />;
        default:
          return <div className={`p-12 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
            <h3 className="text-2xl font-bold mb-2">Section Not Found</h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              The requested section "{activeTab}" is not available.
            </p>
          </div>;
      }
    }

    // STUDENT ROUTES
    console.log('🎓 Rendering STUDENT content for tab:', activeTab);
    
    switch (activeTab) {
      case 'dashboard':
        return <StudentDashboard 
          currentUser={currentUser}
          badges={badges}
          challenges={challenges}
          resources={resources}
          darkMode={darkMode}
        />;
      case 'badges':
        return <Badges 
          badges={badges}
          setBadges={setBadges}
          currentUser={currentUser}
          darkMode={darkMode}
        />;
      case 'gamification':
        return <Gamification 
          rewards={rewards}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          badges={badges}
          darkMode={darkMode}
        />;
      case 'activities':
        return <StudentActivities
          currentUser={currentUser}
          darkMode={darkMode}
        />;
      case 'resources':
        return <Resources 
          resources={resources}
          setResources={setResources}
          darkMode={darkMode}
        />;
      case 'teachers':
        return <Teachers 
          teachers={teachers}
          darkMode={darkMode}
        />;
      case 'messages':
        return <Messages 
          messages={messages}
          teachers={teachers}
          currentUser={currentUser}
          darkMode={darkMode}
        />;
      case 'games':
        return <Games 
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          darkMode={darkMode}
        />;
      case 'calendar':
        return <div className={`p-12 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
          <h3 className="text-2xl font-bold mb-2">📅 Schedule</h3>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Calendar feature coming soon!</p>
        </div>;
      case 'profile':
        return <Profile 
          currentUser={currentUser}
          badges={badges}
          darkMode={darkMode}
          setShowSettingsModal={setShowSettingsModal}
        />;
      default:
        return <div className={`p-12 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
          <h3 className="text-2xl font-bold mb-2">Section Not Found</h3>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            The requested section "{activeTab}" is not available.
          </p>
        </div>;
    }
  };

  if (!isAuthenticated) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Navbar 
        currentUser={currentUser}
        notifications={notifications}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        addNotification={addNotification}
        setNotifications={setNotifications}
      />
      
      <div className="flex">
        <Sidebar 
          currentUser={currentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          darkMode={darkMode}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 p-6 transition-all duration-300">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center animate-pulse">
                <div className="text-6xl mb-4">⏳</div>
                <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</p>
              </div>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>

      {showSettingsModal && (
        <SettingsModal 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
}

// Main App Component with Router
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Google OAuth Callback Route */}
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        
        {/* Main App Route */}
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}