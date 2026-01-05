import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, GraduationCap, UserCircle, Shield, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import styles from './AuthPage.module.css';
import Captcha from '../components/common/captcha/Captcha';

/* =========================================================================
   1. MAIN AUTH PAGE (Login / Register Slider)
   ========================================================================= */
interface AuthPageProps {
  initialMode?: 'login' | 'register';
}

const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const [isSignIn, setIsSignIn] = useState(initialMode === 'login');
  const [selectedRole, setSelectedRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsSignIn(initialMode === 'login');
  }, [initialMode]);

  const triggerConfetti = () => {
    const end = Date.now() + 1000;
    const colors = ['#6366f1', '#8b5cf6', '#ffffff'];
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const roles = [
    { id: 'student', name: 'Student', icon: <GraduationCap size={24} /> },
    { id: 'teacher', name: 'Teacher', icon: <UserCircle size={24} /> },
    { id: 'admin', name: 'Admin', icon: <Shield size={24} /> }
  ];

  const RoleSelector = () => (
    <div className={styles.roleSelectorContainer}>
      {roles.map(role => (
        <div 
          key={role.id}
          className={`${styles.roleBox} ${selectedRole === role.id ? styles.active : ''}`}
          onClick={() => setSelectedRole(role.id)}
        >
          <div className={styles.icon}>{role.icon}</div>
          <span>{role.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f3f4f6', position: 'relative' }}>
      
      {/* GLOBAL BACKGROUND */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', zIndex: 1 }}></div>
        <iframe
          src="https://www.youtube.com/embed/5C8qfSA7eaY?autoplay=1&mute=1&controls=0&loop=1&playlist=5C8qfSA7eaY&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1"
          style={{ position: 'absolute', top: '50%', left: '50%', width: '150vw', height: '150vh', transform: 'translate(-50%, -50%)', border: 'none' }}
          allow="autoplay; encrypted-media" 
          title="Global Background"
        />
      </div>

      {/* --- MAIN CARD --- */}
      <div className={`${styles.container} ${!isSignIn ? styles.rightPanelActive : ''}`}>
        
        {/* SIGN UP FORM */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form className={styles.form} onSubmit={(e) => { e.preventDefault(); if(!isCaptchaValid) alert("Please complete Captcha"); }}>
            <h1 className={styles.title}>Create Account</h1>
            <p className={styles.subtitle}>Start your journey with us</p>
            <RoleSelector />
            
            <div className={styles.inputGroup}><User className={styles.inputIcon} size={20} /><input type="text" placeholder="Full Name" className={styles.inputField} /></div>
            <div className={styles.inputGroup}><Mail className={styles.inputIcon} size={20} /><input type="email" placeholder="Email Address" className={styles.inputField} /></div>
            <div className={styles.inputGroup}><Lock className={styles.inputIcon} size={20} /><input type="password" placeholder="Password" className={styles.inputField} /></div>

            <div style={{ width: '100%', marginBottom: '1rem' }}><Captcha onValidate={setIsCaptchaValid} /></div>

            <button className={styles.primaryButton} disabled={!isCaptchaValid} style={{ opacity: isCaptchaValid ? 1 : 0.6 }}>Sign Up</button>
            <div className={styles.divider}><div className={styles.line}></div><span>OR</span><div className={styles.line}></div></div>
            <button type="button" className={styles.googleButton}><img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '20px' }} />Sign up with Google</button>
          </form>
        </div>

        {/* SIGN IN FORM */}
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form className={styles.form} onSubmit={(e) => { e.preventDefault(); /* LOGIN LOGIC HERE */ }}>
            <h1 className={styles.title}>Sign In</h1>
            <p className={styles.subtitle}>Select your role to continue</p>
            <RoleSelector />

            <div className={styles.inputGroup}><Mail className={styles.inputIcon} size={20} /><input type="email" placeholder="Email" className={styles.inputField} /></div>
            <div className={styles.inputGroup}>
              <Lock className={styles.inputIcon} size={20} />
              <input type={showPassword ? "text" : "password"} placeholder="Password" className={styles.inputField} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>

            <span className={styles.forgotPassword} onClick={() => navigate('/forgot-password')}>Forgot your password?</span>

            <button className={styles.primaryButton}>SIGN IN</button>
            <div className={styles.divider}><div className={styles.line}></div><span>OR</span><div className={styles.line}></div></div>
            <button type="button" className={styles.googleButton}><img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '20px' }} />Sign in with Google</button>
          </form>
        </div>

        {/* OVERLAY */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay} onClick={triggerConfetti}>
            <div className={styles.videoWrapper}>
               <iframe src="https://www.youtube.com/embed/5C8qfSA7eaY?autoplay=1&mute=1&controls=0&loop=1&playlist=5C8qfSA7eaY&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1" allow="autoplay; encrypted-media" title="Slider Video"/>
            </div>
            <div className={styles.overlayFilter}></div>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Welcome Back!</h1>
              <p style={{ margin: '0 0 30px', maxWidth: '80%' }}>To keep connected with us please login with your personal info</p>
              <button className={styles.ghostButton} onClick={(e) => { e.stopPropagation(); setIsSignIn(true); }}>Sign In</button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Hello, Friend!</h1>
              <p style={{ margin: '0 0 30px', maxWidth: '80%' }}>Enter your personal details and start your journey with us</p>
              <button className={styles.ghostButton} onClick={(e) => { e.stopPropagation(); setIsSignIn(false); }}>Sign Up</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;

/* =========================================================================
   2. FORGOT PASSWORD COMPONENT
   ========================================================================= */
export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    setIsSubmitted(true);
  };

  return (
    <div className={styles.minimalPage}>
      <div className={styles.minimalCard}>
        {isSubmitted ? (
          <div className={styles.successMessage}>
            <div className={styles.iconCircle} style={{ color: '#10b981' }}><CheckCircle size={64} /></div>
            <h2 className={styles.minimalTitle}>Check your mail</h2>
            <p className={styles.minimalSubtitle}>We have sent recovery instructions to your email.</p>
            <button className={styles.primaryButton} onClick={() => navigate('/login')}>Back to Sign In</button>
          </div>
        ) : (
          <>
            <div className={styles.iconCircle}><div className={styles.iconBackground}><Mail size={32} /></div></div>
            <h2 className={styles.minimalTitle}>Forgot Password?</h2>
            <p className={styles.minimalSubtitle}>No worries, we'll send you reset instructions.</p>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}><Mail className={styles.inputIcon} size={20} /><input type="email" className={styles.inputField} placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              <button type="submit" className={styles.primaryButton}>Send Reset Link</button>
            </form>
            <div onClick={() => navigate('/login')} className={styles.backLink}><ArrowLeft size={16} /><span>Back to log in</span></div>
          </>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   3. RESET PASSWORD COMPONENT
   ========================================================================= */
export const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className={styles.minimalPage}>
      <div className={styles.minimalCard}>
        <div className={styles.iconCircle}><div className={styles.iconBackground}><Lock size={32} /></div></div>
        <h2 className={styles.minimalTitle}>Set new password</h2>
        <p className={styles.minimalSubtitle}>Your new password must be different from previously used passwords.</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}><Lock className={styles.inputIcon} size={20} /><input type={showPassword ? "text" : "password"} className={styles.inputField} placeholder="New Password" required /></div>
          <div className={styles.inputGroup}>
            <Lock className={styles.inputIcon} size={20} />
            <input type={showPassword ? "text" : "password"} className={styles.inputField} placeholder="Confirm Password" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
          </div>
          <button type="submit" className={styles.primaryButton}>Reset Password</button>
        </form>
        <div onClick={() => navigate('/login')} className={styles.backLink}><ArrowLeft size={16} /><span>Back to log in</span></div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. PROTECTED ROUTE COMPONENT
   ========================================================================= */
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token'); 
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};