import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import ThemeProvider from './contexts/ThemeContext'
import AuthProvider from './contexts/AuthContext'
import AivaProvider from './contexts/AivaContext'
import CourseProvider from './contexts/CourseContext'
import GradeProvider from './contexts/GradeContext'
import InquiryProvider from './contexts/InquiryContext'
import NotificationProvider from './contexts/NotificationContext'

import Navbar from './components/navigation/Navbar'
import Sidebar from './components/navigation/Sidebar'

import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import GradesPage from './pages/GradesPage'
import InquiriesPage from './pages/InquiriesPage'
import MyInquiriesPage from './pages/MyInquiriesPage'
import ForumPage from './pages/ForumPage'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import MembershipPage from './pages/MembershipPage'
import AchievementsPage from './pages/AchievementsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AivaProvider>
          <CourseProvider>
            <GradeProvider>
              <InquiryProvider>
                <NotificationProvider>
                  <BrowserRouter>
                    <div className="app-root">
                      <Navbar />
                      <div className="app-layout" style={{ display: 'flex', minHeight: '100vh' }}>
                        <aside style={{ width: 260 }}>
                          <Sidebar />
                        </aside>
                        <main style={{ flex: 1, padding: 20 }}>
                          <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/courses" element={<CoursesPage />} />
                            <Route path="/courses/:id" element={<CourseDetailPage />} />
                            <Route path="/grades" element={<GradesPage />} />
                            <Route path="/inquiries" element={<InquiriesPage />} />
                            <Route path="/my-inquiries" element={<MyInquiriesPage />} />
                            <Route path="/forum" element={<ForumPage />} />
                            <Route path="/events" element={<EventsPage />} />
                            <Route path="/events/:id" element={<EventDetailPage />} />
                            <Route path="/membership" element={<MembershipPage />} />
                            <Route path="/achievements" element={<AchievementsPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/404" element={<NotFoundPage />} />
                            <Route path="*" element={<Navigate to="/404" replace />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </BrowserRouter>
                </NotificationProvider>
              </InquiryProvider>
            </GradeProvider>
          </CourseProvider>
        </AivaProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}