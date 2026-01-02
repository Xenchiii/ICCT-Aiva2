export const ROLES = {
  ADMIN: 'Admin',
  PROFESSOR: 'Professor',
  STUDENT: 'Student',
  OFFICER: 'Officer',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

// Define what each role can do
export const PERMISSIONS = {
  [ROLES.ADMIN]: [
    'view_admin_dashboard',
    'manage_users',
    'manage_courses',
    'resolve_all_inquiries',
    'view_system_analytics'
  ],
  [ROLES.PROFESSOR]: [
    'view_professor_dashboard',
    'input_grades',
    'manage_assignments',
    'view_class_analytics',
    'resolve_academic_inquiries'
  ],
  [ROLES.OFFICER]: [
    'view_officer_dashboard',
    'manage_events',
    'post_announcements',
    'verify_memberships'
  ],
  [ROLES.STUDENT]: [
    'view_student_dashboard',
    'view_grades',
    'submit_assignments',
    'create_inquiry',
    'access_aiva'
  ],
} as const;

export const hasPermission = (role: UserRole, permission: string): boolean => {
  const rolePermissions = PERMISSIONS[role] || [];
  return rolePermissions.includes(permission as any);
};