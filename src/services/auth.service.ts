import { ApiService } from './api.service';

export const AuthService = {
  login: (credentials: object) => ApiService.request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  logout: () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  },
  getCurrentUser: () => ApiService.request('/auth/me'),
};