import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, LifeBuoy, ShieldAlert, GraduationCap } from 'lucide-react';

const CATEGORIES = [
  { id: 'Academic', icon: GraduationCap, title: 'Academic', desc: 'Grades, subjects, and re-grading.' },
  { id: 'Technical', icon: LifeBuoy, title: 'Technical', desc: 'Login issues and platform bugs.' },
  { id: 'Behavioral', icon: ShieldAlert, title: 'Behavioral', desc: 'Reporting misconduct or ethics.' },
  { id: 'General', icon: MessageSquare, title: 'General', desc: 'General school inquiries.' },
];

const InquiriesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-primary">Student Support Center</h1>
        <p className="text-gray-500">How can Aiva and the admin team help you today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => navigate(`/dashboard/inquiries/new?cat=${cat.id}`)}
            className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition text-left group"
          >
            <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-primary/5 transition">
              <cat.icon className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{cat.title} Inquiry</h3>
              <p className="text-sm text-gray-500">{cat.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InquiriesPage;