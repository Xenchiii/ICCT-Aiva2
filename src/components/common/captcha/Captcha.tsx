import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import './Captcha.css';

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onValidate }) => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  // Generates a random 6-character string
  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing chars like I, O, 0, 1
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(result);
    setInput('');
    onValidate(false); // Reset validation
  };

  useEffect(() => {
    generateCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setInput(val);
    
    // Auto-validate as user types
    if (val === code) {
      onValidate(true);
    } else {
      onValidate(false);
    }
  };

  return (
    <div className="captcha-container">
      <div className="captcha-header">
        <label>Security Check</label>
        <button 
          type="button" 
          onClick={generateCode} 
          className="refresh-btn"
          title="Get new code"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>
      
      <div className="captcha-wrapper">
        {/* The visual code box */}
        <div className="captcha-display">
          {code.split('').map((char, index) => (
            <span key={index} style={{ transform: `rotate(${Math.random() * 20 - 10}deg)` }}>
              {char}
            </span>
          ))}
        </div>

        {/* The input field */}
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter code"
          className="captcha-input"
          maxLength={6}
        />
      </div>
    </div>
  );
};

export default Captcha;