import React from 'react';
import { Mail, MoreHorizontal } from 'lucide-react';

const students = [
  { id: '2021-00123', name: 'Alcantara, Jasmine', email: 'jasmine.a@student.icct.edu.ph', status: 'Active' },
  { id: '2021-00124', name: 'Bautista, Miguel', email: 'miguel.b@student.icct.edu.ph', status: 'Active' },
  { id: '2021-00125', name: 'Cruz, Angelo', email: 'angelo.c@student.icct.edu.ph', status: 'At Risk' },
];

const StudentRoster = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-bold text-lg text-primary">Student Roster - CS101</h3>
        <input type="text" placeholder="Search student..." className="p-2 border border-gray-300 rounded-lg text-sm w-64" />
      </div>

      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
          <tr>
            <th className="px-6 py-3">ID Number</th>
            <th className="px-6 py-3">Full Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.id}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{student.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{student.email}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {student.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-3 text-gray-400">
                  <button className="hover:text-primary"><Mail size={18} /></button>
                  <button className="hover:text-primary"><MoreHorizontal size={18} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRoster;