// src/utils/constants.ts
export const APP_NAME = 'ICCT Aiva';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'AI-Powered Learning Management System';

// Colors
export const COLORS = {
  PRIMARY: '#003049',
  SECONDARY: '#FCE205',
  ACCENT: '#4682B4',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
} as const;

// User Roles
export const USER_ROLES = {
  STUDENT: 'STUDENT',
  PROFESSOR: 'PROFESSOR',
  ADMIN: 'ADMIN',
  OFFICER: 'OFFICER',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

// Inquiry Priorities with SLA
export const INQUIRY_PRIORITIES = {
  URGENT: { label: 'Urgent', responseTime: 2, color: '#EF4444' },
  HIGH: { label: 'High', responseTime: 6, color: '#F59E0B' },
  MEDIUM: { label: 'Medium', responseTime: 24, color: '#3B82F6' },
  LOW: { label: 'Low', responseTime: 48, color: '#10B981' },
} as const;

// Membership Prices (in PHP)
export const MEMBERSHIP_PRICES = {
  CES: 20,
  ICSO: 20,
} as const;

// Forum Categories
export const FORUM_CATEGORIES = [
  { id: 'HOMEWORK_HELP', name: 'Homework Help', icon: '📚', color: '#3B82F6' },
  { id: 'CLASS_DISCUSSIONS', name: 'Class Discussions', icon: '💬', color: '#10B981' },
  { id: 'STUDY_GROUPS', name: 'Study Groups', icon: '👥', color: '#8B5CF6' },
  { id: 'ANNOUNCEMENTS', name: 'Announcements', icon: '📢', color: '#F59E0B' },
  { id: 'EXTRACURRICULAR', name: 'Extracurricular Activities', icon: '🎉', color: '#EC4899' },
  { id: 'CAREER_GUIDANCE', name: 'College & Career Guidance', icon: '🎓', color: '#14B8A6' },
  { id: 'RESOURCES', name: 'Resources & Study Materials', icon: '📖', color: '#6366F1' },
  { id: 'TECHNICAL_SUPPORT', name: 'Technical Support', icon: '🔧', color: '#EF4444' },
  { id: 'FEEDBACK', name: 'Feedback & Suggestions', icon: '💡', color: '#FBBF24' },
  { id: 'RULES', name: 'Rules & Guidelines', icon: '📋', color: '#6B7280' },
] as const;

// Philippine Grading Scale
export const GRADE_SCALE = {
  PHILIPPINE: [
    { min: 97, max: 100, grade: 1.0, label: 'Excellent', description: '97-100%' },
    { min: 94, max: 96, grade: 1.25, label: 'Excellent', description: '94-96%' },
    { min: 91, max: 93, grade: 1.5, label: 'Very Good', description: '91-93%' },
    { min: 88, max: 90, grade: 1.75, label: 'Very Good', description: '88-90%' },
    { min: 85, max: 87, grade: 2.0, label: 'Good', description: '85-87%' },
    { min: 82, max: 84, grade: 2.25, label: 'Good', description: '82-84%' },
    { min: 79, max: 81, grade: 2.5, label: 'Satisfactory', description: '79-81%' },
    { min: 76, max: 78, grade: 2.75, label: 'Satisfactory', description: '76-78%' },
    { min: 75, max: 75, grade: 3.0, label: 'Passed', description: '75%' },
    { min: 70, max: 74, grade: 4.0, label: 'Conditional', description: '70-74%' },
    { min: 0, max: 69, grade: 5.0, label: 'Failed', description: 'Below 70%' },
  ],
} as const;

// Honors & Awards
export const HONORS = {
  PRESIDENTS_LIST: { min: 1.0, max: 1.25, label: "President's List", icon: '🏆' },
  DEANS_LIST: { min: 1.26, max: 1.75, label: "Dean's List", icon: '⭐' },
  HONORABLE_MENTION: { min: 1.76, max: 2.0, label: 'Honorable Mention', icon: '🎖️' },
} as const;

// File Upload Limits
export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE_MB: 10,
  MAX_SIZE_BYTES: 10 * 1024 * 1024,
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENT: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ],
    SPREADSHEET: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ],
    PRESENTATION: [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
    CODE: [
      'text/javascript',
      'text/x-python',
      'text/x-java-source',
      'text/x-c++src',
      'application/json',
      'text/html',
      'text/css',
    ],
  },
  EXTENSIONS: {
    IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    DOCUMENT: ['.pdf', '.doc', '.docx', '.txt'],
    SPREADSHEET: ['.xls', '.xlsx', '.csv'],
    PRESENTATION: ['.ppt', '.pptx'],
    CODE: ['.js', '.py', '.java', '.cpp', '.c', '.json', '.html', '.css'],
  },
} as const;

// Pagination
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 10,
  PAGE_SIZES: [5, 10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// Date & Time Formats
export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  WITH_TIME: 'MM/DD/YYYY HH:mm',
  TIME_ONLY: 'HH:mm A',
  ISO: 'YYYY-MM-DD',
} as const;

// Status Badges
export const STATUS_COLORS = {
  ACTIVE: '#10B981',
  PENDING: '#F59E0B',
  COMPLETED: '#3B82F6',
  CANCELLED: '#EF4444',
  DRAFT: '#6B7280',
  PUBLISHED: '#10B981',
  EXPIRED: '#EF4444',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: { icon: 'ℹ️', color: '#3B82F6' },
  SUCCESS: { icon: '✅', color: '#10B981' },
  WARNING: { icon: '⚠️', color: '#F59E0B' },
  ERROR: { icon: '❌', color: '#EF4444' },
  ANNOUNCEMENT: { icon: '📢', color: '#8B5CF6' },
  GRADE: { icon: '📊', color: '#3B82F6' },
  ASSIGNMENT: { icon: '📝', color: '#F59E0B' },
  EVENT: { icon: '📅', color: '#EC4899' },
} as const;

// API Endpoints Base
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  COURSES: '/api/courses',
  GRADES: '/api/grades',
  ASSIGNMENTS: '/api/assignments',
  INQUIRIES: '/api/inquiries',
  EVENTS: '/api/events',
  MEMBERSHIP: '/api/membership',
  FORUM: '/api/forum',
  ATTENDANCE: '/api/attendance',
  AI: '/api/ai',
  PROCTORING: '/api/proctoring',
  USERS: '/api/users',
  ANALYTICS: '/api/analytics',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  PREFERENCES: 'preferences',
  CART: 'membership_cart',
} as const;

// Proctoring Settings
export const PROCTORING_DEFAULTS = {
  FACE_CHECK_INTERVAL: 30, // seconds
  MAX_TAB_SWITCHES: 3,
  MAX_VIOLATIONS: 5,
  CONFIDENCE_THRESHOLD: 0.8,
} as const;

// AI Settings
export const AI_SETTINGS = {
  AIVA_MODEL: 'gemini-pro',
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
  PLAGIARISM_THRESHOLD: 0.7,
  AUTO_GRADE_CONFIDENCE: 0.85,
} as const;

// Attendance Settings
export const ATTENDANCE_SETTINGS = {
  LATE_THRESHOLD_MINUTES: 15,
  FACE_RECOGNITION_CONFIDENCE: 0.9,
  AUTO_MARK_INTERVAL: 30, // minutes
} as const;

// Export all as single constant object (optional)
export const CONSTANTS = {
  APP_NAME,
  APP_VERSION,
  COLORS,
  USER_ROLES,
  INQUIRY_PRIORITIES,
  MEMBERSHIP_PRICES,
  FORUM_CATEGORIES,
  GRADE_SCALE,
  HONORS,
  FILE_UPLOAD_LIMITS,
  PAGINATION_DEFAULTS,
  DATE_FORMATS,
  STATUS_COLORS,
  NOTIFICATION_TYPES,
  API_ENDPOINTS,
  STORAGE_KEYS,
  PROCTORING_DEFAULTS,
  AI_SETTINGS,
  ATTENDANCE_SETTINGS,
} as const;