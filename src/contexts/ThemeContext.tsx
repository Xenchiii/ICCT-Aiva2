import React from 'react'
export const ThemeContext = React.createContext('light')
export default function ThemeProvider({children}:{children:React.ReactNode}){return <ThemeContext.Provider value={'light'}>{children}</ThemeContext.Provider>}
