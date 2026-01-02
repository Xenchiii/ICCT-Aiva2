export const ROUTES = {
  PUBLIC: {
    LOGIN: '/login',
    LANDING: '/',
    FORGOT_PASSWORD: '/forgot-password',
  },
  PRIVATE: {
    DASHBOARD: '/dashboard',
    
    // Student Routes
    GRADES: '/dashboard/grades',
    COURSES: '/dashboard/courses',
    SCHEDULE: '/dashboard/schedule',
    INQUIRIES: '/dashboard/inquiries',
    PROFILE: '/dashboard/profile',
    
    // Feature Routes
    SETTINGS: '/dashboard/settings',
    NOTIFICATIONS: '/dashboard/notifications',
  },
  
  // Role specific redirects
  DEFAULT_REDIRECT: {
    Admin: '/admin/dashboard',
    Professor: '/professor/dashboard',
    Student: '/dashboard',
    Officer: '/officer/dashboard',
  }
} as const;