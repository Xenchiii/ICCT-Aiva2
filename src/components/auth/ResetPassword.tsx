import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import './ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  // Optional: You can use searchParams to get the token from URL if needed
  // const [searchParams] = useSearchParams();
  // const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    
    // Simulate API Call to update password
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    alert("Password updated successfully!");
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-in">
        {/* Header */}
        <div className="auth-header">
           <img 
             src="https://ui-avatars.com/api/?name=ICCT&background=0D8ABC&color=fff&rounded=true&bold=true" 
             alt="ICCT Logo" 
             className="auth-logo" 
           />
           <h1 className="auth-title">Set New Password</h1>
           <p className="auth-subtitle">
             Your new password must be different from previously used passwords.
           </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="input-group">
            <label className="input-label">New Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <div className="input-wrapper">
              <CheckCircle className="input-icon" size={18} />
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
             {loading ? <Loader2 className="animate-spin" size={20} /> : 'Reset Password'}
             {!loading && <ArrowRight size={18} />}
          </button>

          <div className="auth-header" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
             <p className="auth-subtitle" style={{ fontSize: '0.8rem' }}>
               <span 
                 onClick={() => navigate('/login')} 
                 style={{ color: '#3b82f6', cursor: 'pointer', fontWeight: 600 }}
               >
                 Back to Login
               </span>
             </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;