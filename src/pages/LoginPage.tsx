import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import './AuthPages.css';

const LoginPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-card animate-slide-up">
        <div className="auth-header">
          <img src="/logo.png" alt="ICCT Logo" className="auth-logo" />
          <h1 className="text-2xl font-black text-primary">ICCT Aiva</h1>
          <p className="text-gray-500">Sign in to your student portal</p>
        </div>
        
        <AuthForm mode="login" />
        
        <div className="auth-footer">
          <p className="text-xs text-gray-400 mt-6">
            Computer Explorer Society - Antipolo Campus
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;