import { AivaProvider } from '@/contexts/AivaContext'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

// Home/Dashboard Component
const HomePage: React.FC = () => {
  const { user, logout, connectWallet, disconnectWallet } = useAuth()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '10px',
        padding: '40px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{ margin: 0, color: '#333', fontSize: '32px' }}>
              Welcome, {user?.name}!
            </h1>
            <p style={{ margin: '10px 0 0 0', color: '#666' }}>
              Email: {user?.email}
            </p>
            {user?.walletAddress && (
              <p style={{ margin: '5px 0 0 0', color: '#667eea', fontSize: '14px' }}>
                Wallet: {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {!user?.walletAddress ? (
              <button
                onClick={connectWallet}
                style={{
                  padding: '12px 24px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                Connect Wallet
              </button>
            ) : (
              <button
                onClick={disconnectWallet}
                style={{
                  padding: '12px 24px',
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                Disconnect Wallet
              </button>
            )}
            <button
              onClick={logout}
              style={{
                padding: '12px 24px',
                background: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '40px'
        }}>
          <div style={{
            padding: '30px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '10px',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Dashboard</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>
              Your personalized learning dashboard
            </p>
          </div>

          <div style={{
            padding: '30px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '10px',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Courses</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>
              Manage your courses and progress
            </p>
          </div>

          <div style={{
            padding: '30px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '10px',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Grades</h3>
            <p style={{ margin: 0, opacity: 0.9 }}>
              View your grades and performance
            </p>
          </div>
        </div>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '10px'
        }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>Getting Started</h2>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#666' }}>
            <li style={{ marginBottom: '10px' }}>Complete your profile</li>
            <li style={{ marginBottom: '10px' }}>Browse available courses</li>
            <li style={{ marginBottom: '10px' }}>Connect your MetaMask wallet for blockchain features</li>
            <li style={{ marginBottom: '10px' }}>Track your progress and grades</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Main App Component with Router
function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AivaProvider>
        <Router>
          <AppContent />
        </Router>
      </AivaProvider>
    </AuthProvider>
  )
}

export default App