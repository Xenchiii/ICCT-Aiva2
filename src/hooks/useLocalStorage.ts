import { useState } from 'react'
export default function useLocalStorage<T>(key:string, initial:T){
  const [state,setState]=useState<T>(initial)
  return [state,setState] as const
}
