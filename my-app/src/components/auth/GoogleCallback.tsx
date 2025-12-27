import { useEffect } from 'react';

export default function GoogleCallback() {
  useEffect(() => {
    console.log('🔐 OAuth callback page loaded');
    
    // Parse the hash fragment (Google returns access_token in hash)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    const accessToken = params.get('access_token');
    const error = params.get('error');
    
    if (error) {
      console.error('❌ OAuth error:', error);
      if (window.opener) {
        window.opener.postMessage({
          type: 'GOOGLE_AUTH_ERROR',
          error: 'Google Sign-In failed: ' + error
        }, window.location.origin);
      }
      window.close();
    } else if (accessToken) {
      console.log('✅ Access token received');
      
      // Fetch user info from Google
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(userInfo => {
        console.log('✅ User info received:', userInfo);
        
        // Send data back to parent window
        if (window.opener) {
          window.opener.postMessage({
            type: 'GOOGLE_AUTH_SUCCESS',
            accessToken: accessToken,
            userInfo: userInfo
          }, window.location.origin);
        }
        
        // Close popup after short delay
        setTimeout(() => {
          window.close();
        }, 1000);
      })
      .catch(err => {
        console.error('❌ Error fetching user info:', err);
        if (window.opener) {
          window.opener.postMessage({
            type: 'GOOGLE_AUTH_ERROR',
            error: 'Failed to fetch user information'
          }, window.location.origin);
        }
        window.close();
      });
    } else {
      console.error('❌ No access token found');
      if (window.opener) {
        window.opener.postMessage({
          type: 'GOOGLE_AUTH_ERROR',
          error: 'No access token received'
        }, window.location.origin);
      }
      window.close();
    }
  }, []);

  return (
    <div style={{
      fontFamily: "'Roboto', Arial, sans-serif",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      margin: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '400px'
      }}>
        <div style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }} />
        <h2 style={{
          color: '#202124',
          fontSize: '24px',
          fontWeight: 600,
          margin: '0 0 10px'
        }}>
          Completing Sign In
        </h2>
        <p style={{ 
          color: '#5f6368', 
          fontSize: '14px',
          marginBottom: '20px'
        }}>
          Please wait while we authenticate your account with Google
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '15px',
          background: '#f8f9fa',
          borderRadius: '10px'
        }}>
          <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span style={{ 
            fontSize: '14px', 
            color: '#5f6368',
            fontWeight: 500
          }}>
            Connecting to Google
          </span>
        </div>
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}