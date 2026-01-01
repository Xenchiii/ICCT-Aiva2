import React from 'react'
export const AivaContext = React.createContext(null)
export default function AivaProvider({children}:{children:React.ReactNode}){return <AivaContext.Provider value={null}>{children}</AivaContext.Provider>}
