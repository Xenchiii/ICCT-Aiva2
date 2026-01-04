import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Lock, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // Pass the data to the AuthContext register function
      await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName
      });
      
      alert("Account created successfully! Please sign in.");
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card animate-in">
        {/* Header */}
        <div className="register-header">
          <img 
            src="https://ui-avatars.com/api/?name=ICCT&background=0D8ABC&color=fff&rounded=true&bold=true" 
            alt="ICCT Logo" 
            className="register-logo" 
          />
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Join the ICCT Aiva student community</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input
                type="text"
                className="register-input"
                placeholder="Full Name (e.g. Juan Dela Cruz)"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                className="register-input"
                placeholder="Student Email (@icct.edu.ph)"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                className="register-input"
                placeholder="Create Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <div className="input-wrapper">
              <CheckCircle className="input-icon" size={18} />
              <input
                type="password"
                className="register-input"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="register-btn">
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Footer */}
        <div className="register-footer">
          Already have an account?
          <span onClick={() => navigate('/login')} className="link-text">
            Sign In here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;