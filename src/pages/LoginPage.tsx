// Change '@' to relative path '../'
import AuthForm from '../components/auth/AuthForm';

export const RegisterPage = () => {
  return (
    <div className="auth-page-wrapper">
      <AuthForm mode="register" />
    </div>
  );
};

export default RegisterPage;