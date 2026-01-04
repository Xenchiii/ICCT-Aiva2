import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. DEFINE THE USER TYPE (Merging all requirements)
export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  role: 'student' | 'admin' | 'faculty' | 'officer';
  walletAddress?: string; // Used in App.tsx
  photoUrl?: string;
  programCode?: string;
  studentId?: string;
  yearLevel?: number;
  department?: string;
}

// 2. DEFINE THE CONTEXT TYPE (What functions are available)
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (userData: any) => Promise<void>; // Used in AuthForm
  logout: () => void;
  connectWallet: () => void;    // Used in App.tsx
  disconnectWallet: () => void; // Used in App.tsx
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password?: string) => {
    // Mock Login Logic
    // FIX: Log the password to silence the "unused variable" warning
    console.log("Logging in...", email, password); 
    
    setUser({
      id: '1',
      email,
      name: 'Student User',
      firstName: 'Student',
      lastName: 'User',
      fullName: 'Student User',
      role: 'student',
      walletAddress: '',
      programCode: 'BSIT',
      photoUrl: '',
      studentId: '2023-0001',
      yearLevel: 3,
      department: 'College of Computer Studies'
    });
  };

  const register = async (userData: any) => {
    console.log("Registering...", userData);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const logout = () => setUser(null);

  const connectWallet = () => {
    if (user) setUser({ ...user, walletAddress: '0x71C...9A21' });
  };

  const disconnectWallet = () => {
    if (user) setUser({ ...user, walletAddress: '' });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, connectWallet, disconnectWallet }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};