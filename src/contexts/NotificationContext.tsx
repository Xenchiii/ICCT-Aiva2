import React from 'react'
export const NotificationContext = React.createContext(null)
export default function NotificationProvider({children}:{children:React.ReactNode}){return <NotificationContext.Provider value={null}>{children}</NotificationContext.Provider>}
