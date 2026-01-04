import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// FIX: Expanded User interface to include all fields used in ProfilePage
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'admin' | 'faculty';
  
  // Optional fields for Profile Page
  photoUrl?: string;
  fullName?: string;
  studentId?: string;
  program?: string;
  programCode?: string;
  yearLevel?: number;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth Check Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (email && password) {
        // Mock User with ALL fields populated for testing
        const mockUser: User = {
          id: '1',
          email,
          firstName: 'Juan',
          lastName: 'Dela Cruz',
          fullName: 'Juan Dela Cruz',
          role: 'student',
          studentId: '2023-00123',
          program: 'Bachelor of Science in Information Technology',
          programCode: 'BSIT',
          yearLevel: 3,
          department: 'College of Computer Studies',
          photoUrl: '' // Empty string will trigger the fallback avatar
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (userData: any) => {
    console.log('Registering:', userData);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};