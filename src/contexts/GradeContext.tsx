import React from 'react'
export const GradeContext = React.createContext(null)
export default function GradeProvider({children}:{children:React.ReactNode}){return <GradeContext.Provider value={null}>{children}</GradeContext.Provider>}
