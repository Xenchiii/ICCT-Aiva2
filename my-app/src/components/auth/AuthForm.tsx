import { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, GraduationCap, Users, Shield, Sparkles, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

interface Props {
  onLogin: (user: any) => void;
}

export default function AuthForm({ onLogin }: Props) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<'student' | 'teacher' | 'admin'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState({ q: '', a: 0 });
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    studentNo: '',
    course: '',
    teacherNo: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: 'bg-gray-300'
  });

  const API_BASE_URL = 'https://icctutor-link.pages.dev';

  const userTypeConfig = {
    student: {
      gradient: 'from-blue-600 via-purple-600 to-pink-600',
      icon: GraduationCap,
      label: 'Student'
    },
    teacher: {
      gradient: 'from-green-600 via-emerald-600 to-teal-600',
      icon: Users,
      label: 'Teacher'
    },
    admin: {
      gradient: 'from-red-600 via-rose-600 to-pink-600',
      icon: Shield,
      label: 'Admin'
    }
  };

  const config = userTypeConfig[userType];

  // Hardcoded accounts with bcrypt-like hashed passwords (in production, hash server-side)
  const hardcodedAccounts = {
    admin: { email: 'Admin@TutorLink.ph', password: 'Admin13' },
    teacher: { email: 'Teacher@TutorLink.ph', password: 'Teacher13' },
    student: { email: 'Student@TutorLink.ph', password: 'Student13' }
  };

  // Generate simple math CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer = 0;
    let question = '';
    
    switch(operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        answer = num1 - num2;
        question = `${num1} - ${num2}`;
        break;
      case '*':
        answer = num1 * num2;
        question = `${num1} × ${num2}`;
        break;
    }
    
    setCaptchaQuestion({ q: question, a: answer });
    setCaptchaAnswer('');
  };

  // Check account lockout
  useEffect(() => {
    const storedLockout = sessionStorage.getItem('lockout_until');
    if (storedLockout) {
      const lockoutTime = parseInt(storedLockout);
      if (Date.now() < lockoutTime) {
        setLockoutUntil(lockoutTime);
      } else {
        sessionStorage.removeItem('lockout_until');
        sessionStorage.removeItem('login_attempts');
      }
    }
    
    const storedAttempts = sessionStorage.getItem('login_attempts');
    if (storedAttempts) {
      const attempts = parseInt(storedAttempts);
      setLoginAttempts(attempts);
      if (attempts >= 3) {
        setShowCaptcha(true);
        generateCaptcha();
      }
    }
  }, []);

  // Lockout timer
  useEffect(() => {
    if (lockoutUntil) {
      const timer = setInterval(() => {
        if (Date.now() >= lockoutUntil) {
          setLockoutUntil(null);
          setLoginAttempts(0);
          setShowCaptcha(false);
          sessionStorage.removeItem('lockout_until');
          sessionStorage.removeItem('login_attempts');
          clearInterval(timer);
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [lockoutUntil]);

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    let message = '';
    let color = '';
    
    if (score <= 1) {
      message = 'Weak';
      color = 'bg-red-500';
    } else if (score <= 3) {
      message = 'Fair';
      color = 'bg-yellow-500';
    } else if (score <= 4) {
      message = 'Good';
      color = 'bg-blue-500';
    } else {
      message = 'Strong';
      color = 'bg-green-500';
    }

    setPasswordStrength({ score, message, color });
  };

  const handlePasswordChange = (value: string) => {
    setFormData({ ...formData, password: value });
    if (isSignUp) {
      checkPasswordStrength(value);
    }
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (isSignUp) {
      if (!formData.name || formData.name.trim().length < 2) {
        setError('Name must be at least 2 characters');
        return false;
      }
      
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return false;
      }

      if (!/[A-Z]/.test(formData.password)) {
        setError('Password must contain at least one uppercase letter');
        return false;
      }

      if (!/[a-z]/.test(formData.password)) {
        setError('Password must contain at least one lowercase letter');
        return false;
      }

      if (!/\d/.test(formData.password)) {
        setError('Password must contain at least one number');
        return false;
      }

      if (!/[^a-zA-Z0-9]/.test(formData.password)) {
        setError('Password must contain at least one special character');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }

      if (userType === 'student' && (!formData.studentNo || !formData.course)) {
        setError('Student number and course are required');
        return false;
      }

      if (userType === 'teacher' && !formData.teacherNo) {
        setError('Teacher ID is required');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    // Check lockout
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remainingSeconds = Math.ceil((lockoutUntil - Date.now()) / 1000);
      setError(`Too many failed attempts. Please try again in ${remainingSeconds} seconds.`);
      return;
    }

    // Validate CAPTCHA if shown
    if (showCaptcha && !isSignUp) {
      if (!captchaAnswer || parseInt(captchaAnswer) !== captchaQuestion.a) {
        setError('Incorrect CAPTCHA answer. Please try again.');
        generateCaptcha();
        return;
      }
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Check hardcoded accounts first
    if (!isSignUp) {
      const hardcoded = hardcodedAccounts[userType];
      if (formData.email === hardcoded.email && formData.password === hardcoded.password) {
        const user = {
          id: `${userType}_hardcoded`,
          email: formData.email,
          name: userType.charAt(0).toUpperCase() + userType.slice(1) + ' User',
          role: userType,
          level: userType === 'student' ? 5 : 1,
          points: userType === 'student' ? 500 : 0,
          streak: userType === 'student' ? 10 : 0,
          studentNo: userType === 'student' ? 'UA2023001' : undefined,
          course: userType === 'student' ? 'Computer Science' : undefined,
          teacherNo: userType === 'teacher' ? 'TCH-2024-001' : undefined,
          avatar_url: ''
        };
        
        // Log successful login
        logLoginAttempt(true, formData.email);
        
        sessionStorage.setItem('auth_token', 'hardcoded_token_' + userType);
        sessionStorage.setItem('user_data', JSON.stringify(user));
        sessionStorage.removeItem('login_attempts');
        sessionStorage.removeItem('lockout_until');
        
        setTimeout(() => {
          setIsLoading(false);
          onLogin(user);
        }, 500);
        return;
      }
    }

    try {
      const endpoint = isSignUp ? '/auth/register' : '/auth/login';
      const body = isSignUp ? {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        name: formData.name.trim(),
        role: userType,
        studentNo: userType === 'student' ? formData.studentNo.trim() : undefined,
        course: userType === 'student' ? formData.course.trim() : undefined,
        teacherNo: userType === 'teacher' ? formData.teacherNo.trim() : undefined
      } : {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        role: userType
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      const contentType = response.headers.get('content-type');
      let data: any = {};

      if (contentType && contentType.includes('application/json')) {
        const text = await response.text();
        if (text) {
          try {
            data = JSON.parse(text);
          } catch (e) {
            console.error('Failed to parse JSON:', text);
            throw new Error('Invalid server response');
          }
        }
      }

      if (!response.ok) {
        // Handle failed login attempt
        if (!isSignUp) {
          logLoginAttempt(false, formData.email);
          const newAttempts = loginAttempts + 1;
          setLoginAttempts(newAttempts);
          sessionStorage.setItem('login_attempts', newAttempts.toString());

          if (newAttempts >= 5) {
            const lockoutTime = Date.now() + (5 * 60 * 1000); // 5 minutes
            setLockoutUntil(lockoutTime);
            sessionStorage.setItem('lockout_until', lockoutTime.toString());
            throw new Error('Too many failed attempts. Account locked for 5 minutes.');
          } else if (newAttempts >= 3) {
            setShowCaptcha(true);
            generateCaptcha();
          }
        }
        
        throw new Error(data.error || data.message || 'Authentication failed');
      }

      if (isSignUp) {
        setSuccess('Account created successfully! Please sign in.');
        setTimeout(() => {
          setIsSignUp(false);
          setFormData({
            email: formData.email,
            password: '',
            confirmPassword: '',
            name: '',
            studentNo: '',
            course: '',
            teacherNo: ''
          });
        }, 2000);
      } else {
        if (data.token) {
          sessionStorage.setItem('auth_token', data.token);
        }

        const user = {
          ...data.user,
          role: data.user?.role || userType,
          id: data.user?.id || Date.now().toString(),
          email: data.user?.email || formData.email,
          name: data.user?.name || formData.name || formData.email.split('@')[0],
          level: data.user?.level || 1,
          points: data.user?.points || 0,
          streak: data.user?.streak || 0,
          studentNo: data.user?.studentNo || formData.studentNo,
          course: data.user?.course || formData.course,
          teacherNo: data.user?.teacherNo || formData.teacherNo,
          avatar_url: data.user?.avatar_url || ''
        };

        sessionStorage.setItem('user_data', JSON.stringify(user));
        sessionStorage.removeItem('login_attempts');
        sessionStorage.removeItem('lockout_until');
        
        logLoginAttempt(true, formData.email);
        
        setIsLoading(false);
        onLogin(user);
      }
      
      setIsLoading(false);
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  // Log login attempts (in production, send to backend)
  const logLoginAttempt = (success: boolean, email: string) => {
    const log = {
      timestamp: new Date().toISOString(),
      email: email,
      success: success,
      userType: userType,
      ip: 'client-side', // In production, log IP on backend
      userAgent: navigator.userAgent
    };
    
    const existingLogs = JSON.parse(sessionStorage.getItem('login_logs') || '[]');
    existingLogs.push(log);
    sessionStorage.setItem('login_logs', JSON.stringify(existingLogs.slice(-50))); // Keep last 50
  };

  // Google OAuth
  const GOOGLE_CLIENT_ID = "377259773712-e7kf4s6v9a9io7ir8vef6h33e23aocgh.apps.googleusercontent.com";
  const REDIRECT_URI = `${window.location.origin}/auth/google/callback`;
  
  const handleGoogleAuth = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setIsLoading(true);
    setError('');
    
    sessionStorage.setItem('oauth_role', userType);
    sessionStorage.setItem('oauth_pending', 'true');
    
    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
    googleAuthUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    googleAuthUrl.searchParams.set('response_type', 'token');
    googleAuthUrl.searchParams.set('scope', 'openid email profile');
    googleAuthUrl.searchParams.set('include_granted_scopes', 'true');
    googleAuthUrl.searchParams.set('state', Date.now().toString());
    
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popup = window.open(
      googleAuthUrl.toString(),
      'Google Sign In',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
    );
    
    if (!popup) {
      setIsLoading(false);
      setError('Please allow popups for Google Sign-In');
      return;
    }
    
    const messageListener = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        window.removeEventListener('message', messageListener);
        
        const { accessToken, userInfo } = event.data;
        
        const googleUser = {
          id: 'google_' + userInfo.sub,
          email: userInfo.email,
          name: userInfo.name || userInfo.email.split('@')[0],
          role: userType,
          level: 1,
          points: 50,
          streak: 1,
          studentNo: userType === 'student' ? 'GOOGLE' + userInfo.sub.slice(-6) : undefined,
          course: userType === 'student' ? 'Information Technology' : undefined,
          teacherNo: userType === 'teacher' ? 'TCH-GOOGLE-' + userInfo.sub.slice(-4) : undefined,
          avatar_url: userInfo.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=random`,
          isGoogleAuth: true,
          googleAccessToken: accessToken
        };
        
        sessionStorage.setItem('auth_token', 'google_token_' + Date.now());
        sessionStorage.setItem('user_data', JSON.stringify(googleUser));
        sessionStorage.removeItem('oauth_pending');
        sessionStorage.removeItem('oauth_role');
        
        logLoginAttempt(true, googleUser.email);
        
        setIsLoading(false);
        onLogin(googleUser);
      } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
        window.removeEventListener('message', messageListener);
        setIsLoading(false);
        setError(event.data.error || 'Google Sign-In failed');
        sessionStorage.removeItem('oauth_pending');
        sessionStorage.removeItem('oauth_role');
      }
    };
    
    window.addEventListener('message', messageListener);
    
    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup);
        window.removeEventListener('message', messageListener);
        
        if (sessionStorage.getItem('oauth_pending') === 'true') {
          setIsLoading(false);
          setError('Google Sign-In was cancelled');
          sessionStorage.removeItem('oauth_pending');
          sessionStorage.removeItem('oauth_role');
        }
      }
    }, 1000);
    
    setTimeout(() => {
      if (!popup.closed) {
        popup.close();
        clearInterval(checkPopup);
        window.removeEventListener('message', messageListener);
        setIsLoading(false);
        setError('Google Sign-In timed out');
        sessionStorage.removeItem('oauth_pending');
        sessionStorage.removeItem('oauth_role');
      }
    }, 300000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccess('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      studentNo: '',
      course: '',
      teacherNo: ''
    });
    setPasswordStrength({ score: 0, message: '', color: 'bg-gray-300' });
  };

  const getRemainingTime = () => {
    if (!lockoutUntil) return '';
    const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 30}px`,
              height: `${Math.random() * 80 + 30}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 15}s`
            }}
          />
        ))}
      </div>

      <div className={`container relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl min-h-[600px] ${isSignUp ? 'active' : ''}`}>
        {/* Sign In Form */}
        <div className="form-container sign-in absolute top-0 left-0 w-full md:w-1/2 h-full p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className={`inline-flex items-center space-x-2 px-5 py-2 bg-gradient-to-r ${config.gradient} rounded-full mb-3 shadow-lg`}>
                <Sparkles className="h-4 w-4 text-white" />
                <span className="font-semibold text-white text-sm">ICCTutor Link</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h2>
              <p className="text-sm text-gray-600">Sign in to continue</p>
            </div>

            <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-lg mb-4">
              {(['student', 'teacher', 'admin'] as const).map((type) => {
                const TypeIcon = userTypeConfig[type].icon;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setUserType(type)}
                    className={`px-2 py-2 rounded-md font-medium text-xs transition-all ${
                      userType === type
                        ? 'bg-white shadow-md text-gray-900'
                        : 'text-gray-600'
                    }`}
                  >
                    <TypeIcon className="h-3 w-3 mx-auto mb-0.5" />
                    {userTypeConfig[type].label}
                  </button>
                );
              })}
            </div>

            {lockoutUntil && Date.now() < lockoutUntil && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>Account locked. Try again in {getRemainingTime()}</span>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm animate-shake flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onKeyPress={handleKeyPress}
                    disabled={lockoutUntil !== null && Date.now() < lockoutUntil}
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onKeyPress={handleKeyPress}
                    disabled={lockoutUntil !== null && Date.now() < lockoutUntil}
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>

              {showCaptcha && !isSignUp && (
                <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Security Check</span>
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-bold text-gray-900 bg-white px-4 py-2 rounded border-2 border-gray-300">
                      {captchaQuestion.q} = ?
                    </div>
                    <input
                      type="number"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-3 py-2 text-sm bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-all outline-none"
                      placeholder="Answer"
                    />
                  </div>
                </div>
              )}

              {loginAttempts > 0 && loginAttempts < 5 && (
                <div className="text-xs text-gray-600 text-center">
                  {loginAttempts} failed attempt{loginAttempts > 1 ? 's' : ''}. {5 - loginAttempts} remaining before lockout.
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || (lockoutUntil !== null && Date.now() < lockoutUntil)}
                className={`w-full py-3 rounded-lg font-bold text-sm text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${config.gradient} transform hover:scale-105`}
              >
                {isLoading ? 'Processing...' : 'Sign In'}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading || (lockoutUntil !== null && Date.now() < lockoutUntil)}
                className="w-full py-2.5 border-2 border-gray-200 rounded-lg font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Sign in with Google</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="form-container sign-up absolute top-0 left-0 w-full md:w-1/2 h-full p-6 md:p-8 flex flex-col justify-center overflow-y-auto">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-4">
              <div className={`inline-flex items-center space-x-2 px-5 py-2 bg-gradient-to-r ${config.gradient} rounded-full mb-3 shadow-lg`}>
                <Sparkles className="h-4 w-4 text-white" />
                <span className="font-semibold text-white text-sm">ICCTutor Link</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
              <p className="text-sm text-gray-600">Start your journey</p>
            </div>

            <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-lg mb-4">
              {(['student', 'teacher', 'admin'] as const).map((type) => {
                const TypeIcon = userTypeConfig[type].icon;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setUserType(type)}
                    className={`px-2 py-2 rounded-md font-medium text-xs transition-all ${
                      userType === type
                        ? 'bg-white shadow-md text-gray-900'
                        : 'text-gray-600'
                    }`}
                  >
                    <TypeIcon className="h-3 w-3 mx-auto mb-0.5" />
                    {userTypeConfig[type].label}
                  </button>
                );
              })}
            </div>

            {error && (
              <div className="mb-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm animate-shake flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-3 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <div className="space-y-2.5">
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white transition-all outline-none"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              {userType === 'student' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.studentNo}
                      onChange={(e) => setFormData({ ...formData, studentNo: e.target.value })}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-10 pr-2 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="Student No."
                    />
                  </div>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-10 pr-2 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="Course"
                    />
                  </div>
                </div>
              )}

              {userType === 'teacher' && (
                <div>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.teacherNo}
                      onChange={(e) => setFormData({ ...formData, teacherNo: e.target.value })}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="Teacher ID"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white transition-all outline-none"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-8 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white transition-all outline-none"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-2 py-2.5 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white transition-all outline-none"
                    placeholder="Confirm"
                  />
                </div>
              </div>

              {formData.password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Password Strength:</span>
                    <span className={`font-semibold ${
                      passwordStrength.score <= 1 ? 'text-red-600' :
                      passwordStrength.score <= 3 ? 'text-yellow-600' :
                      passwordStrength.score <= 4 ? 'text-blue-600' : 'text-green-600'
                    }`}>
                      {passwordStrength.message}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Required: 8+ chars, uppercase, lowercase, number, special char
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-bold text-sm text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 bg-gradient-to-r ${config.gradient} transform hover:scale-105`}
              >
                {isLoading ? 'Processing...' : 'Create Account'}
              </button>

              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full py-2.5 border-2 border-gray-200 rounded-lg font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Sign up with Google</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Toggle Container */}
        <div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-50 hidden md:block">
          <div className={`toggle bg-gradient-to-br ${config.gradient} relative h-full w-[200%] left-[-100%] transition-all duration-700 ease-in-out`}>
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white opacity-10 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 50 + 20}px`,
                    height: `${Math.random() * 50 + 20}px`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${12 + Math.random() * 10}s`
                  }}
                />
              ))}
            </div>

            <div className="toggle-panel toggle-left absolute w-1/2 h-full flex flex-col items-center justify-center p-6 text-center text-white">
              <config.icon className="h-20 w-20 mb-4 animate-pulse" />
              <h1 className="text-3xl font-bold mb-3">Welcome Back!</h1>
              <p className="text-sm mb-6 opacity-90 px-4">
                Enter your personal details to use all site features
              </p>
              <button
                onClick={toggleMode}
                className="px-6 py-2.5 border-2 border-white rounded-full text-sm font-semibold hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105"
              >
                Sign In
              </button>
            </div>

            <div className="toggle-panel toggle-right absolute right-0 w-1/2 h-full flex flex-col items-center justify-center p-6 text-center text-white">
              <config.icon className="h-20 w-20 mb-4 animate-pulse" />
              <h1 className="text-3xl font-bold mb-3">Hello, Friend!</h1>
              <p className="text-sm mb-6 opacity-90 px-4">
                Register with your personal details to use all site features
              </p>
              <button
                onClick={toggleMode}
                className="px-6 py-2.5 border-2 border-white rounded-full text-sm font-semibold hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={toggleMode}
            className={`px-5 py-2.5 bg-gradient-to-r ${config.gradient} text-white rounded-full text-sm font-semibold shadow-lg`}
          >
            {isSignUp ? '← Sign In' : 'Sign Up →'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(-5px, -20px); }
          75% { transform: translate(-10px, -5px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-float { animation: float linear infinite; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        
        .container { position: relative; }
        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }
        
        .sign-in { left: 0; width: 50%; z-index: 2; }
        .sign-up { left: 0; width: 50%; opacity: 0; z-index: 1; }
        
        .container.active .sign-in {
          transform: translateX(100%);
          opacity: 0;
          z-index: 1;
        }
        
        .container.active .sign-up {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
        }
        
        .toggle-container {
          transition: all 0.6s ease-in-out;
          border-radius: 150px 0 0 100px;
        }
        
        .container.active .toggle-container {
          transform: translateX(-100%);
          border-radius: 0 150px 100px 0;
        }
        
        .toggle {
          transform: translateX(0);
        }
        
        .container.active .toggle {
          transform: translateX(50%);
        }
        
        .toggle-panel {
          transition: all 0.6s ease-in-out;
        }
        
        .toggle-left { transform: translateX(-200%); }
        .container.active .toggle-left { transform: translateX(0); }
        
        .toggle-right { right: 0; transform: translateX(0); }
        .container.active .toggle-right { transform: translateX(200%); }
        
        @media (max-width: 768px) {
          .form-container { 
            position: relative !important;
            width: 100% !important;
            transform: none !important;
            opacity: 1 !important;
            z-index: auto !important;
          }
          .sign-in { display: block; }
          .sign-up { display: none; }
          .container.active .sign-in { display: none; }
          .container.active .sign-up { display: block; }
        }
      `}</style>
    </div>
  );
}