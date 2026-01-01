import React from 'react'
export const InquiryContext = React.createContext(null)
export default function InquiryProvider({children}:{children:React.ReactNode}){return <InquiryContext.Provider value={null}>{children}</InquiryContext.Provider>}
