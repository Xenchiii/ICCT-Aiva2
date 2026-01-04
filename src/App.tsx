import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CourseProvider } from './contexts/CourseContext';
import { GradeProvider } from './contexts/GradeContext';
import { InquiryProvider } from './contexts/InquiryContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AivaProvider } from './contexts/AivaContext';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages - Auth
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Pages - Dashboards
import AdminDashboard from './pages/dashboards/AdminDashboard';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import ProfessorDashboard from './pages/dashboards/ProfessorDashboard';
import DashboardRouter from './pages/dashboards/DashboardRouter';

// Pages - Main
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import GradesPage from './pages/GradesPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import ForumPage from './pages/ForumPage';
import InquiriesPage from './pages/InquiriesPage';
import MyInquiriesPage from './pages/MyInquiriesPage';
import AchievementsPage from './pages/AchievementsPage';
import MembershipPage from './pages/MembershipPage';
import NotFoundPage from './pages/NotFoundPage';

// AI Components
import AivaFloatingButton from './components/ai/AivaFloatingButton';

// Styles
import './App.css';
import './styles/global.css';
import './styles/variables.css';
import './styles/themes.css';
import './styles/animations.css';
import './styles/typography.css';
import './styles/utilities.css';
import './styles/responsive.css';
import './styles/accessibility.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <NotificationProvider>
            <CourseProvider>
              <GradeProvider>
                <InquiryProvider>
                  <AivaProvider>
                    <div className="app">
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Protected Dashboard Routes */}
                        <Route
                          path="/dashboard/*"
                          element={
                            <ProtectedRoute>
                              <DashboardRouter />
                            </ProtectedRoute>
                          }
                        />

                        {/* Admin Routes */}
                        <Route
                          path="/admin/*"
                          element={
                            <ProtectedRoute>
                              <AdminDashboard />
                            </ProtectedRoute>
                          }
                        />

                        {/* Professor Routes */}
                        <Route
                          path="/professor/*"
                          element={
                            <ProtectedRoute>
                              <ProfessorDashboard />
                            </ProtectedRoute>
                          }
                        />

                        {/* Student Routes */}
                        <Route
                          path="/student/*"
                          element={
                            <ProtectedRoute>
                              <StudentDashboard />
                            </ProtectedRoute>
                          }
                        />

                        {/* Course Routes */}
                        <Route
                          path="/courses"
                          element={
                            <ProtectedRoute>
                              <CoursesPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/courses/:courseId"
                          element={
                            <ProtectedRoute>
                              <CourseDetailPage />
                            </ProtectedRoute>
                          }
                        />

                        {/* Grades Routes */}
                        <Route
                          path="/grades"
                          element={
                            <ProtectedRoute>
                              <GradesPage />
                            </ProtectedRoute>
                          }
                        />

                        {/* Events Routes */}
                        <Route
                          path="/events"
                          element={
                            <ProtectedRoute>
                              <EventsPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/events/:eventId"
                          element={
                            <ProtectedRoute>
                              <EventDetailPage />
                            </ProtectedRoute>
                          }
                        />

                        {/* Forum Routes */}
                        <Route
                          path="/forum"
                          element={
                            <ProtectedRoute>
                              <ForumPage />
                            </ProtectedRoute>
                          }
                        />

                        {/* Inquiry Routes */}
                        <Route
                          path="/inquiries"
                          element={
                            <ProtectedRoute>
                              <InquiriesPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/my-inquiries"
                          element={
                            <ProtectedRoute>
                              <MyInquiriesPage />
                            </ProtectedRoute>
                          }
                        />

                        {/* Profile & Personal Routes */}
                        <Route
                          path="/achievements"
                          element={
                            <ProtectedRoute>
                              <AchievementsPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/membership"
                          element={
                            <ProtectedRoute>
                              <MembershipPage />
                            </ProtectedRoute>
                          }
                        />

                        {/* 404 and Catch-all */}
                        <Route path="/404" element={<NotFoundPage />} />
                        <Route path="*" element={<Navigate to="/404" replace />} />
                      </Routes>

                      {/* Global AI Assistant - Available on all pages */}
                      <AivaFloatingButton />
                    </div>
                  </AivaProvider>
                </InquiryProvider>
              </GradeProvider>
            </CourseProvider>
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;