import React from 'react'
export const CourseContext = React.createContext(null)
export default function CourseProvider({children}:{children:React.ReactNode}){return <CourseContext.Provider value={null}>{children}</CourseContext.Provider>}
