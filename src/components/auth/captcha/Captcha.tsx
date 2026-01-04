import { useState } from 'react'
import '../../auth/Register.css'
import './Captcha.css'

export default function Captcha(){
  const [value,setValue] = useState('')
  const [status,setStatus] = useState<string | null>(null)

  const verify = async ()=>{
    // placeholder: call captcha service
    const ok = value.toLowerCase() === 'human'
    setStatus(ok ? 'verified' : 'invalid')
  }

  return (
    <div className="captcha-root">
      <div className="captcha-image">[ CAPTCHA IMAGE ]</div>
      <input
        aria-label="captcha-input"
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        placeholder="Type the text you see"
      />
      <button onClick={verify}>Verify</button>
      {status && <div className={`captcha-status ${status}`}>{status}</div>}
    </div>
  )
}
