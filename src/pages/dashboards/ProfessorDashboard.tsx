import React from 'react';
import { Users, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const classPerformance = [
  { subject: 'IT 302', average: 1.45, atRisk: 2 },
  { subject: 'CS 201', average: 1.85, atRisk: 5 },
  { subject: 'ACT 101', average: 1.25, atRisk: 0 },
];

const ProfessorDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Subject Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><BookOpen size={20}/></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Active Subjects</span>
          </div>
          <h3 className="text-2xl font-black text-primary">3 Classes</h3>
          <p className="text-xs text-gray-400 mt-1">105 Total Students</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle size={20}/></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">At-Risk Students</span>
          </div>
          <h3 className="text-2xl font-black text-red-600">7 Total</h3>
          <p className="text-xs text-gray-400 mt-1">Requiring intervention</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle2 size={20}/></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Grading Progress</span>
          </div>
          <h3 className="text-2xl font-black text-primary">88%</h3>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>
      </div>

      {/* Class Average Comparison */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-primary mb-6">Subject Average Performance</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classPerformance}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="subject" axisLine={false} tickLine={false} />
              <YAxis reversed domain={[1.0, 5.0]} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="average" radius={[6, 6, 0, 0]} barSize={40}>
                {classPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.average > 3.0 ? '#ef4444' : '#003049'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;