import React from 'react'
export const AuthContext = React.createContext(null)
export default function AuthProvider({children}:{children:React.ReactNode}){return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>}
