import React from 'react';
import { Timer, AlertCircle, CheckCircle } from 'lucide-react';

interface SLAProps {
  createdAt: string;
  category: string;
}

const SLAIndicator = ({ createdAt, category }: SLAProps) => {
  // Logic to calculate remaining time based on ICCT policy
  const hoursLeft = 14; // Mock calculation
  const isUrgent = hoursLeft < 12;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
      isUrgent ? 'bg-red-50 border-red-100 text-red-600' : 'bg-green-50 border-green-100 text-green-600'
    }`}>
      {isUrgent ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-tighter">SLA Status</span>
        <span className="text-xs font-bold">{hoursLeft}h remaining</span>
      </div>
    </div>
  );
};

export default SLAIndicator;