import React, { useState } from 'react';
import { Save, Download } from 'lucide-react';

const GradingInterface = () => {
  const [students] = useState([
    { id: '2023-001', name: 'Santos, Maria', quiz1: 85, midterm: 88, final: 0 },
    { id: '2023-002', name: 'Reyes, Jose', quiz1: 92, midterm: 90, final: 0 },
    { id: '2023-003', name: 'Dizon, Bea', quiz1: 78, midterm: 82, final: 0 },
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div>
          <h3 className="font-bold text-primary">CS101 - Gradebook</h3>
          <p className="text-xs text-gray-500">Final Grading Period</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 text-sm px-3 py-2 text-gray-600 hover:bg-white rounded border border-transparent hover:border-gray-200">
            <Download size={16} /> Export CSV
          </button>
          <button className="flex items-center gap-2 text-sm px-4 py-2 bg-primary text-white rounded hover:opacity-90">
            <Save size={16} /> Save Grades
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3">Student ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3 w-24 text-center">Quiz 1 (10%)</th>
              <th className="px-6 py-3 w-24 text-center">Midterm (40%)</th>
              <th className="px-6 py-3 w-24 text-center">Final (50%)</th>
              <th className="px-6 py-3 w-32 text-center">Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{student.id}</td>
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4 text-center">
                  <input type="number" defaultValue={student.quiz1} className="w-16 p-1 border rounded text-center" />
                </td>
                <td className="px-6 py-4 text-center">
                  <input type="number" defaultValue={student.midterm} className="w-16 p-1 border rounded text-center" />
                </td>
                <td className="px-6 py-4 text-center">
                  <input type="number" defaultValue={student.final} className="w-16 p-1 border rounded text-center" />
                </td>
                <td className="px-6 py-4 text-center font-bold text-primary">
                  {/* Placeholder for calc logic */}
                  1.75
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradingInterface;