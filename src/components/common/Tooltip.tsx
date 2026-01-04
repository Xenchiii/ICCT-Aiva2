import React, { ReactNode } from 'react';
import './Tooltip.css';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip-box">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;