// services/api/api.ts
// Complete API Service for ICCTutor Link

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = this.getStoredToken();
  }

  private getStoredToken(): string | null {
    try {
      return sessionStorage.getItem('auth_token');
    } catch {
      return this.token;
    }
  }

  setToken(token: string) {
    this.token = token;
    try {
      sessionStorage.setItem('auth_token', token);
    } catch {
      // Fallback to memory storage
    }
  }

  clearToken() {
    this.token = null;
    try {
      sessionStorage.removeItem('auth_token');
    } catch {
      // Ignore if sessionStorage is not available
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Request failed' };
      }

      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return { error: 'Network error' };
    }
  }

  // ==================== AUTH ENDPOINTS ====================

  async register(userData: {
    email: string;
    password: string;
    name: string;
    role: 'student' | 'teacher';
    studentNo?: string;
    teacherNo?: string;
    department?: string;
    course?: string;
  }) {
    const response = await this.request<{ user: any; token: string }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    );

    if (response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async login(credentials: { 
    email: string; 
    password: string;
    userType?: string;
  }) {
    const response = await this.request<{ user: any; token: string }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      }
    );

    if (response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  // ==================== USER ENDPOINTS ====================

  async getCurrentUser() {
    return this.request<any>('/users/me', { method: 'GET' });
  }

  async updateUser(updates: {
    name?: string;
    bio?: string;
    avatar_url?: string;
    department?: string;
    points?: number;
    level?: number;
    streak?: number;
  }) {
    return this.request<{ message: string }>('/users/me', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // ==================== BADGE ENDPOINTS ====================

  async getBadges() {
    return this.request<any[]>('/badges', { method: 'GET' });
  }

  async earnBadge(badgeId: string) {
    return this.request<{ message: string; points: number }>(
      `/badges/earn/${badgeId}`,
      { method: 'POST' }
    );
  }

  // ==================== CHALLENGE ENDPOINTS ====================

  async getChallenges() {
    return this.request<any[]>('/challenges', { method: 'GET' });
  }

  async updateChallengeProgress(challengeId: string, increment = 1) {
    return this.request<{ progress: number; completed: boolean; reward: number }>(
      `/challenges/${challengeId}/progress`,
      {
        method: 'POST',
        body: JSON.stringify({ increment }),
      }
    );
  }

  // ==================== REWARD ENDPOINTS ====================

  async getRewards() {
    return this.request<any[]>('/rewards', { method: 'GET' });
  }

  async redeemReward(rewardId: string) {
    return this.request<{ message: string; remaining_points: number }>(
      `/rewards/${rewardId}/redeem`,
      { method: 'POST' }
    );
  }

  // ==================== TEACHER ENDPOINTS (PUBLIC) ====================

  async getTeachers() {
    return this.request<any[]>('/teachers', { method: 'GET' });
  }

  // ==================== TEACHER-SPECIFIC ENDPOINTS ====================

  async getTeacherStudents() {
    return this.request<any[]>('/teacher/students', { method: 'GET' });
  }

  async getTeacherClasses() {
    return this.request<any[]>('/teacher/classes', { method: 'GET' });
  }

  async createClass(classData: {
    title: string;
    subject: string;
    schedule: string;
    description?: string;
    room?: string;
  }) {
    return this.request<{ id: string; code: string; message: string }>(
      '/teacher/classes',
      {
        method: 'POST',
        body: JSON.stringify(classData),
      }
    );
  }

  async getTeacherAssignments() {
    return this.request<any[]>('/teacher/assignments', { method: 'GET' });
  }

  async createAssignment(assignmentData: {
    title: string;
    subject: string;
    dueDate: string;
    description?: string;
    points?: number | string;
    courseId?: string;
  }) {
    return this.request<{ id: string; message: string }>(
      '/teacher/assignments',
      {
        method: 'POST',
        body: JSON.stringify(assignmentData),
      }
    );
  }

  async getTeacherAnalytics() {
    return this.request<{
      studentCount: number;
      avgGpa: string;
      avgAttendance: number;
      avgCompletion: number;
      avgStudyTime: string;
    }>('/teacher/analytics', { method: 'GET' });
  }

  // ==================== RESOURCE ENDPOINTS ====================

  async getResources(filters?: { subject?: string; type?: string }) {
    const params = new URLSearchParams();
    if (filters?.subject) params.append('subject', filters.subject);
    if (filters?.type) params.append('type', filters.type);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<any[]>(`/resources${query}`, { method: 'GET' });
  }

  async createResource(resourceData: {
    title: string;
    description?: string;
    subject: string;
    type: string;
    fileUrl?: string;
  }) {
    return this.request<{ id: string; message: string }>('/resources', {
      method: 'POST',
      body: JSON.stringify(resourceData),
    });
  }

  // ==================== MESSAGE ENDPOINTS ====================

  async getMessages() {
    return this.request<any[]>('/messages', { method: 'GET' });
  }

  async sendMessage(messageData: { receiverId: string; message: string }) {
    return this.request<{ id: string; message: string }>('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  // ==================== NOTIFICATION ENDPOINTS ====================

  async getNotifications() {
    return this.request<any[]>('/notifications', { method: 'GET' });
  }

  // ==================== ADMIN ENDPOINTS ====================

  async getAdminStats() {
    return this.request<{
      totalUsers: number;
      totalStudents: number;
      totalTeachers: number;
      totalCourses: number;
      totalResources: number;
      totalBadges: number;
      activeUsers: number;
    }>('/admin/stats', { method: 'GET' });
  }

  async getAdminUsers() {
    return this.request<any[]>('/admin/users', { method: 'GET' });
  }
}

export const api = new ApiService();
export default api;