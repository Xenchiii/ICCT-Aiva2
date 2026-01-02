export const API_CONFIG = {
  // Uses Vite's environment variable or falls back to localhost for dev
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8787/api',
  
  TIMEOUT: 15000, // 15 seconds
  RETRIES: 3,

  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      ME: '/auth/me',
      REFRESH: '/auth/refresh',
    },
    ACADEMIC: {
      GRADES: '/grades',
      COURSES: '/courses',
      SCHEDULE: '/courses/schedule',
    },
    SUPPORT: {
      INQUIRIES: '/inquiries',
      NOTIFICATIONS: '/notifications',
    },
    AI: {
      CHAT: '/ai/chat',
      PREDICT: '/ai/predict-grade',
    }
  },
} as const;