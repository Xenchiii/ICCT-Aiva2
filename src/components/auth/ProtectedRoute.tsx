import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoute({children}:{children:React.ReactNode}){
  const authenticated = false
  return authenticated ? <>{children}</> : <Navigate to="/login" />
}
