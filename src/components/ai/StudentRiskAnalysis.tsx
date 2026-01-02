import React from 'react';
import { AlertCircle, TrendingDown, UserMinus } from 'lucide-react';

const StudentRiskAnalysis = () => {
  const atRiskStudents = [
    { name: 'Dela Cruz, Juan', id: '2023-0012', reason: 'Failed 2 Major Exams', riskLevel: 'High' },
    { name: 'Reyes, Ana', id: '2023-0089', reason: 'Attendance < 70%', riskLevel: 'Medium' },
  ];

  return (
    <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
      <div className="p-4 bg-red-50 border-b border-red-100 flex justify-between items-center">
        <h3 className="font-bold text-red-800 flex items-center gap-2">
          <AlertCircle size={18} /> At-Risk Students
        </h3>
        <span className="bg-white text-red-600 px-2 py-0.5 rounded text-xs font-bold">Action Required</span>
      </div>
      
      <div className="divide-y divide-red-50">
        {atRiskStudents.map((s, idx) => (
          <div key={idx} className="p-4 hover:bg-red-50/50 transition flex justify-between items-center">
            <div>
              <p className="font-bold text-sm text-gray-800">{s.name}</p>
              <p className="text-[10px] text-gray-500">{s.id}</p>
            </div>
            <div className="text-right">
              <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase mb-1 ${
                s.riskLevel === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {s.riskLevel} Risk
              </span>
              <p className="text-[10px] text-red-500 font-medium flex items-center justify-end gap-1">
                {s.reason === 'Attendance < 70%' ? <UserMinus size={10}/> : <TrendingDown size={10}/>}
                {s.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentRiskAnalysis;