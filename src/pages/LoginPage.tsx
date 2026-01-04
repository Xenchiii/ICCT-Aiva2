import AuthForm from '../components/auth/AuthForm';
import '../styles/AuthPages.css';

const LoginPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-card animate-slide-up">
        <div className="auth-header">
          {/* Replace this src with your actual logo URL */}
          <img src="https://ui-avatars.com/api/?name=ICCT&background=0D8ABC&color=fff&rounded=true&bold=true" alt="ICCT Logo" className="auth-logo" />
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Access your ICCT Aiva Student Portal</p>
        </div>
        
        <AuthForm mode="login" />
        
        <div className="auth-footer">
          <p className="footer-text">
            © 2026 Computer Explorer Society<br/>Antipolo Campus
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;