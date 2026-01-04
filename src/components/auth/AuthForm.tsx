import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'; // Modern icons


interface AuthFormProps {
  mode: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        navigate('/');
      } else {
        await register(formData);
        alert("Account created! Please log in.");
        navigate('/login');
      }
    } catch (error) {
      alert('Authentication Failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Full Name (Register Only) */}
      {mode === 'register' && (
        <div className="input-group">
          <label className="input-label">Full Name</label>
          <div className="input-wrapper">
            <User className="input-icon" size={18} />
            <input
              type="text"
              className="form-input"
              placeholder="Juan Dela Cruz"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
          </div>
        </div>
      )}

      {/* Email */}
      <div className="input-group">
        <label className="input-label">Student Email</label>
        <div className="input-wrapper">
          <Mail className="input-icon" size={18} />
          <input
            type="email"
            className="form-input"
            placeholder="student@icct.edu.ph"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="input-group">
        <label className="input-label">Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" size={18} />
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        {mode === 'login' && (
          <div className="text-right mt-2">
            <a href="#" className="text-xs text-blue-600 hover:underline font-medium">Forgot Password?</a>
          </div>
        )}
      </div>

      <button type="submit" disabled={loading} className="submit-btn flex items-center justify-center gap-2">
        {loading ? <Loader2 className="animate-spin" size={20} /> : (mode === 'login' ? 'Sign In' : 'Create Account')}
        {!loading && <ArrowRight size={18} />}
      </button>

      {/* Toggle Mode */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => navigate(mode === 'login' ? '/register' : '/login')} 
            className="text-blue-600 font-bold cursor-pointer hover:underline"
          >
            {mode === 'login' ? 'Register now' : 'Sign in'}
          </span>
        </p>
      </div>
    </form>
  );
};

export default AuthForm;