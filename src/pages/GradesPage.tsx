import React from 'react';
import { useGrades } from '@/hooks/useGrades';
import { formatDateTime } from '@/utils/dateFormatter';

const GradesPage = () => {
  const { grades, gwa } = useGrades();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-primary">Academic Performance</h1>
          <p className="text-gray-500">View your current standing for the semester.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400 uppercase font-bold tracking-widest">Current GWA</p>
          <p className="text-4xl font-black text-primary">{gwa}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Score</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Weight</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">PH Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {grades.map((grade, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{grade.courseCode}</td>
                <td className="px-6 py-4">{grade.finalScore}%</td>
                <td className="px-6 py-4">{grade.units} Units</td>
                <td className="px-6 py-4 text-right font-bold text-primary">1.25</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradesPage;