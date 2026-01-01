import { useState, useEffect } from 'react'
export default function useAsync<T>(promiseFactory:()=>Promise<T>){
  const [state,setState] = useState<{loading:boolean;data?:T;error?:any}>({loading:true})
  useEffect(()=>{
    let mounted=true
    promiseFactory().then(data=>mounted && setState({loading:false,data})).catch(error=>mounted && setState({loading:false,error}))
    return ()=>{mounted=false}
  },[promiseFactory])
  return state
}
