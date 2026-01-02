import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, BarChart3, ArrowRight, AlertCircle } from 'lucide-react';
import './GradeDashboard.css';

const GradeDashboard = () => {
  const navigate = useNavigate();

  // Mock Data: Professor's assigned subjects
  const subjects = [
    { id: 'IT302', code: 'IT 302', name: 'Web Development', students: 42, status: 'In Progress', progress: 65 },
    { id: 'CS201', code: 'CS 201', name: 'Data Structures', students: 38, status: 'Completed', progress: 100 },
    { id: 'ACT101', code: 'ACT 101', name: 'Accounting Principles', students: 45, status: 'Pending', progress: 10 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-primary">Grade Management</h1>
          <p className="text-gray-500">Select a subject to encode grades or view analytics.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
          <BarChart3 size={16} /> View Faculty Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <div key={sub.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-primary transition group cursor-pointer"
               onClick={() => navigate(`/dashboard/grading/entry/${sub.id}`)}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-primary group-hover:text-secondary transition">
                <BookOpen size={24} />
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                sub.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {sub.status}
              </span>
            </div>
            
            <h3 className="font-bold text-lg text-primary mb-1">{sub.name}</h3>
            <p className="text-sm font-bold text-gray-400 mb-4">{sub.code}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span className="flex items-center gap-1"><Users size={12}/> {sub.students} Students</span>
                <span>{sub.progress}% Encoded</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${sub.progress}%` }}></div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
              <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition">
                Enter Grades <ArrowRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradeDashboard;