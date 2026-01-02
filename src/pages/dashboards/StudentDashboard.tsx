import React from 'react';
import { 
  TrendingUp, Clock, AlertCircle, 
  CheckCircle2, BrainCircuit, Calendar 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { useGrades } from '@/hooks/useGrades';
import { useAuth } from '@/hooks/useAuth';

// Mock data for the complex Trend Analysis
const performanceData = [
  { week: 'W1', grade: 1.75, predicted: 1.75 },
  { week: 'W2', grade: 1.50, predicted: 1.55 },
  { week: 'W3', grade: 1.75, predicted: 1.60 },
  { week: 'W4', grade: 1.25, predicted: 1.40 },
  { week: 'W5', grade: null, predicted: 1.35 }, // Predicted future trend
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const { grades, gwa } = useGrades();

  return (
    <div className="space-y-6 animate-fade-in p-2">
      {/* Top Layer: Executive Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><TrendingUp size={20}/></span>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">+0.15 vs Pre-lims</span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Current GWA</p>
            <h2 className="text-3xl font-black text-primary">{gwa}</h2>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <span className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Clock size={20}/></span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Attendance Rate</p>
            <h2 className="text-3xl font-black text-primary">94.2%</h2>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2">
              <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '94.2%' }}></div>
            </div>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-primary to-blue-900 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
          <BrainCircuit className="absolute right-[-10px] bottom-[-10px] text-white/10" size={120} />
          <div className="relative z-10">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <AlertCircle size={18} className="text-secondary" /> Aiva Forecast
            </h3>
            <p className="text-sm opacity-80 mt-2 max-w-[80%]">
              Based on your current activity in <b>IT 302</b>, you are projected to reach a <b>1.25</b> grade if you maintain your 90% submission rate.
            </p>
            <button className="mt-4 text-xs font-bold text-secondary border border-secondary/30 px-4 py-2 rounded-lg hover:bg-secondary hover:text-primary transition">
              View Detailed Study Plan
            </button>
          </div>
        </div>
      </div>

      {/* Middle Layer: Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-primary">Performance Velocity</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400"><span className="w-2 h-2 rounded-full bg-primary"></span> ACTUAL</span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400"><span className="w-2 h-2 rounded-full bg-blue-300"></span> PREDICTED</span>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003049" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#003049" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <YAxis reversed domain={[1.0, 5.0]} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="grade" stroke="#003049" strokeWidth={3} fillOpacity={1} fill="url(#colorGrade)" />
                <Line type="monotone" dataKey="predicted" stroke="#93c5fd" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Task Prioritization */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <Calendar size={18} /> Priority Deadlines
          </h3>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-[10px] font-black text-red-600 uppercase">Due Today</p>
              <h4 className="text-sm font-bold text-gray-800">IT 302 - Midterm Project</h4>
              <p className="text-xs text-gray-500">11:59 PM • Lab 4</p>
            </div>
            <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-[10px] font-black text-blue-600 uppercase">Tomorrow</p>
              <h4 className="text-sm font-bold text-gray-800">CS 201 - Quiz 3</h4>
              <p className="text-xs text-gray-500">10:00 AM • Room 302</p>
            </div>
          </div>
          <button className="w-full mt-6 py-2 text-sm font-bold text-primary border-2 border-gray-50 rounded-xl hover:bg-gray-50 transition">
            View All Tasks
          </button>
        </div>
      </div>

      {/* Bottom Layer: Subject Status Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-primary">Subject Performance Breakdown</h3>
          <span className="text-xs text-gray-400">AY 2025-2026 • 1st Semester</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Professor</th>
              <th className="px-6 py-4">Current Score</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">PH Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {grades.map((grade, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition">
                <td className="px-6 py-4">
                  <div className="font-bold text-primary">{grade.courseCode}</div>
                  <div className="text-[10px] text-gray-400">3.0 Units</div>
                </td>
                <td className="px-6 py-4 text-gray-600">Prof. Cruz</td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                     <div className="w-16 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${grade.finalScore}%` }}></div>
                     </div>
                     <span className="font-bold">{grade.finalScore}%</span>
                   </div>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-green-600 font-bold text-[10px]">
                    <CheckCircle2 size={12} /> ON TRACK
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-black text-primary">1.25</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;