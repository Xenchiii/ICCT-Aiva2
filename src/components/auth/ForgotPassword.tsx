import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
// FIX: Adjust import path to go up two levels to find the styles folder
import '../../styles/AuthPages.css'; 

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setIsSent(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-slide-up">
        {/* Header Section */}
        <div className="auth-header">
           <img src="https://ui-avatars.com/api/?name=ICCT&background=0D8ABC&color=fff&rounded=true&bold=true" alt="ICCT Logo" className="auth-logo" />
           <h1 className="auth-title">Reset Password</h1>
           <p className="auth-subtitle">Enter your email to receive recovery instructions.</p>
        </div>

        {isSent ? (
          // Success State (After sending)
          <div className="text-center space-y-6 animate-fade-in">
             <div className="flex justify-center">
               <div className="bg-green-100 p-4 rounded-full">
                 <CheckCircle className="text-green-600 w-12 h-12" />
               </div>
             </div>
             <h3 className="text-xl font-bold text-gray-800">Check your email!</h3>
             <p className="text-gray-500 text-sm">
               We have sent a password recovery link to <strong>{email}</strong>.
             </p>
             <button 
               onClick={() => navigate('/login')}
               className="submit-btn flex items-center justify-center gap-2 mt-4"
             >
               <ArrowLeft size={18} /> Back to Login
             </button>
          </div>
        ) : (
          // Input Form State
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Student Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  className="form-input"
                  placeholder="student@icct.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="submit-btn flex items-center justify-center gap-2">
               {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send Recovery Link'}
               {!loading && <ArrowRight size={18} />}
            </button>

            <div className="text-center mt-6">
              <span 
                onClick={() => navigate('/login')} 
                className="text-sm text-gray-500 font-medium cursor-pointer hover:text-gray-800 transition flex items-center justify-center gap-1"
              >
                <ArrowLeft size={16} /> Back to Login
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;