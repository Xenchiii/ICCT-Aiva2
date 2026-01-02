import React from 'react';
import { CheckCircle2, Clock, MessageSquare, UserCheck } from 'lucide-react';

const InquiryTimeline = ({ status = 'Open' }) => {
  const steps = [
    { label: 'Ticket Created', icon: CheckCircle2, date: 'Jan 2, 2026', active: true },
    { label: 'Assigned to Professor', icon: UserCheck, date: 'Jan 2, 2026', active: true },
    { label: 'Under Review', icon: Clock, date: 'Pending', active: status !== 'Open' },
    { label: 'Resolution Provided', icon: MessageSquare, date: 'Pending', active: status === 'Resolved' },
  ];

  return (
    <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
      {steps.map((step, idx) => (
        <div key={idx} className={`relative ${step.active ? 'text-primary' : 'text-gray-300'}`}>
          <div className={`absolute -left-[30px] p-1 rounded-full bg-white border-2 ${step.active ? 'border-primary' : 'border-gray-100'}`}>
            <step.icon size={14} />
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-sm">{step.label}</p>
            <p className="text-[10px] font-mono">{step.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InquiryTimeline;