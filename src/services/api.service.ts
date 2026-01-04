// src/services/api.service.ts

// ⚠️ CHANGE THIS if your Java server runs on a different port
const API_BASE_URL = 'http://localhost:8080/api'; 

export const ApiService = {
  // Generic request handler
  request: async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    // 1. Get the token from storage (if we are logged in)
    const token = localStorage.getItem('token');
    
    // FIX: Typed as Record<string, string> so we can add 'Authorization' later
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as any), // Merge custom headers
    };

    // 2. Attach token if it exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers, // fetch accepts Record<string, string>
      });

      // 3. Handle "Unauthorized" (Token expired)
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Force logout
        throw new Error('Session expired');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      // 4. Return the real data
      return response.json();
    } catch (error) {
      console.error(`API Request Failed (${endpoint}):`, error);
      throw error;
    }
  },

  // Helper methods
  get: <T>(endpoint: string) => ApiService.request<T>(endpoint, { method: 'GET' }),
  
  post: <T>(endpoint: string, body: any) => 
    ApiService.request<T>(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(body) 
    }),
    
  put: <T>(endpoint: string, body: any) => 
    ApiService.request<T>(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(body) 
    }),
};