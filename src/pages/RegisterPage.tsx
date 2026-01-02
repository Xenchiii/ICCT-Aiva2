import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

// LoginPage.tsx
export const LoginPage = () => (
  <div className="auth-page-wrapper">
    <AuthForm mode="login" />
  </div>
);

// RegisterPage.tsx (Includes BSIT, BSCS, BSIS, ACT selection)
export const RegisterPage = () => (
  <div className="auth-page-wrapper">
    <AuthForm mode="register" />
  </div>
);