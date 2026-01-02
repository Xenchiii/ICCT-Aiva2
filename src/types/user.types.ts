export type UserRole = 'STUDENT' | 'PROFESSOR' | 'ADMIN' | 'OFFICER' | 'SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  studentId?: string;
  course?: string;
  section?: string;
  year?: number;
  dateOfBirth?: string;
  profilePicture?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  studentId?: string;
  course?: string;
  section?: string;
}