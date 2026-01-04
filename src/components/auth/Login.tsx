import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import GoogleButton from './GoogleAuthButton'; // Assuming you saved the previous code here
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call context login function
      await login(formData.email, formData.password);
      navigate('/'); // Redirect to dashboard
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Add your Google Auth logic here later
    console.log("Google Login Clicked");
    alert("Google Login is currently in mock mode.");
  };

  return (
    <div className="login-container">
      <div className="login-card animate-in">
        {/* Header */}
        <div className="login-header">
          <img 
            src="https://ui-avatars.com/api/?name=ICCT&background=0D8ABC&color=fff&rounded=true&bold=true" 
            alt="ICCT Logo" 
            className="login-logo" 
          />
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your ICCT Aiva portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                className="login-input"
                placeholder="student@icct.edu.ph"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                className="login-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="forgot-password">
            <span onClick={() => navigate('/forgot-password')} className="link-text">
              Forgot Password?
            </span>
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Divider & Social Auth */}
        <div className="divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleButton 
            onClick={handleGoogleLogin} 
            label="Sign in with Google"
            style={{ width: '100%' }}
          />
        </div>

        {/* Footer */}
        <div className="login-footer">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className="link-text">
            Register now
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;