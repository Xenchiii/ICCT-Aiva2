import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth, className = '', ...props }) => {
  return (
    <button 
      className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;