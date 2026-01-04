import React from 'react';
import './Tabs.css';

interface TabsProps {
  labels: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ labels, activeIndex, onChange }) => {
  return (
    <div className="tabs-container">
      {labels.map((label, idx) => (
        <button
          key={idx}
          className={`tab-button ${activeIndex === idx ? 'active' : ''}`}
          onClick={() => onChange(idx)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;