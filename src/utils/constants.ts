export const APP_NAME = 'ICCT Aiva';
export const APP_VERSION = '1.0.0';

export const COLORS = {
  PRIMARY: '#003049',
  SECONDARY: '#FCE205',
  ACCENT: '#4682B4',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
} as const;

export const USER_ROLES = {
  STUDENT: 'STUDENT',
  PROFESSOR: 'PROFESSOR',
  ADMIN: 'ADMIN',
  OFFICER: 'OFFICER',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export const INQUIRY_PRIORITIES = {
  URGENT: { label: 'Urgent', responseTime: 2, color: '#EF4444' },
  HIGH: { label: 'High', responseTime: 6, color: '#F59E0B' },
  MEDIUM: { label: 'Medium', responseTime: 24, color: '#3B82F6' },
  LOW: { label: 'Low', responseTime: 48, color: '#10B981' },
} as const;

export const MEMBERSHIP_PRICES = {
  CES: 20,
  ICSO: 20,
  SUB_ORG: 15,
} as const;

export const SUB_ORGANIZATIONS = [
  { id: 'AI_MENTORS', name: 'AI Mentors', focus: 'Artificial Intelligence' },
  { id: 'ALGORITHM_KNIGHTS', name: 'Algorithm Knights', focus: 'Algorithms' },
  { id: 'CODE_WARRIORS', name: 'Code Warriors', focus: 'Competitive Programming' },
  { id: 'CYBERNET_RANGERS', name: 'Cybernet Rangers', focus: 'Cybersecurity' },
  { id: 'DIGITAL_EXPRESSIONISTS', name: 'Digital Expressionists', focus: 'Digital Arts' },
  { id: 'GHZ_BUILDERS', name: 'GHZ Builders', focus: 'Hardware & IoT' },
  { id: 'MOBILE_MNEMONICS', name: 'Mobile Mnemonics', focus: 'Mobile Development' },
  { id: 'WEB_ARACHNIDS', name: 'Web Arachnids', focus: 'Web Development' },
] as const;

export const FORUM_CATEGORIES = [
  { id: 'HOMEWORK_HELP', name: 'Homework Help', icon: '📚' },
  { id: 'CLASS_DISCUSSIONS', name: 'Class Discussions', icon: '💬' },
  { id: 'STUDY_GROUPS', name: 'Study Groups', icon: '👥' },
  { id: 'ANNOUNCEMENTS', name: 'Announcements', icon: '📢' },
  { id: 'EXTRACURRICULAR', name: 'Extracurricular Activities', icon: '🎉' },
  { id: 'CAREER_GUIDANCE', name: 'College & Career Guidance', icon: '🎓' },
  { id: 'RESOURCES', name: 'Resources & Study Materials', icon: '📖' },
  { id: 'TECHNICAL_SUPPORT', name: 'Technical Support', icon: '🔧' },
  { id: 'FEEDBACK', name: 'Feedback & Suggestions', icon: '💡' },
  { id: 'RULES', name: 'Rules & Guidelines', icon: '📋' },
] as const;

export const GRADE_SCALE = {
  PHILIPPINE: [
    { min: 97, max: 100, grade: 1.0, label: 'Excellent' },
    { min: 94, max: 96, grade: 1.25, label: 'Excellent' },
    { min: 91, max: 93, grade: 1.5, label: 'Very Good' },
    { min: 88, max: 90, grade: 1.75, label: 'Very Good' },
    { min: 85, max: 87, grade: 2.0, label: 'Good' },
    { min: 82, max: 84, grade: 2.25, label: 'Good' },
    { min: 79, max: 81, grade: 2.5, label: 'Satisfactory' },
    { min: 76, max: 78, grade: 2.75, label: 'Satisfactory' },
    { min: 75, max: 75, grade: 3.0, label: 'Passed' },
    { min: 70, max: 74, grade: 4.0, label: 'Conditional' },
    { min: 0, max: 69, grade: 5.0, label: 'Failed' },
  ],
} as const;

export const FILE_UPLOAD_LIMITS = {
  MAX_SIZE_MB: 10,
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/gif'],
    DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    SPREADSHEET: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    PRESENTATION: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  },
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;
