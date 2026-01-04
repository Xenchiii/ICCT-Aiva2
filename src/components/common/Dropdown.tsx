import React from 'react';
import { ChevronDown } from 'lucide-react';
import './Dropdown.css';

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
  label?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>}
      <div className="dropdown-container">
        <select className="dropdown-select" {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default Dropdown;