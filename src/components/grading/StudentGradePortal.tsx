import React from 'react';
import { Printer, Download } from 'lucide-react';
import './StudentGradePortal.css'; // Assuming you create this CSS file or use Tailwind

const StudentGradePortal = () => {
  const grades = [
    { code: 'IT 302', title: 'Web Development', units: 3, section: 'BSIT-3A', grade: '1.25', remarks: 'PASSED' },
    { code: 'CS 201', title: 'Data Structures', units: 3, section: 'BSIT-3A', grade: '1.50', remarks: 'PASSED' },
    { code: 'FIL 101', title: 'Komunikasyon', units: 3, section: 'BSIT-3A', grade: '1.00', remarks: 'PASSED' },
    { code: 'PE 3', title: 'Individual Sports', units: 2, section: 'BSIT-3A', grade: '1.00', remarks: 'PASSED' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="flex justify-between items-end bg-white p-8 rounded-2xl border border-gray-100 shadow-sm print:shadow-none">
        <div>
          <img src="/logo.png" alt="ICCT Logo" className="h-12 mb-4" /> {/* Ensure logo exists or remove */}
          <h1 className="text-2xl font-black text-primary">Report of Grades</h1>
          <p className="text-gray-500">1st Semester, Academic Year 2025-2026</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-800">LEAGUE, JAME</p>
          <p className="text-sm text-gray-500">2023-01025 • BSIT</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-primary text-white uppercase font-bold text-xs">
            <tr>
              <th className="px-6 py-4">Subject Code</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Section</th>
              <th className="px-6 py-4 text-center">Units</th>
              <th className="px-6 py-4 text-center">Final Grade</th>
              <th className="px-6 py-4 text-right">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {grades.map((g, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-700">{g.code}</td>
                <td className="px-6 py-4">{g.title}</td>
                <td className="px-6 py-4 text-gray-500">{g.section}</td>
                <td className="px-6 py-4 text-center">{g.units}</td>
                <td className="px-6 py-4 text-center font-black text-lg text-primary">{g.grade}</td>
                <td className="px-6 py-4 text-right">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold">
                    {g.remarks}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 font-bold">
            <tr>
              <td colSpan={3} className="px-6 py-4 text-right">Total Units / GWA:</td>
              <td className="px-6 py-4 text-center">11</td>
              <td className="px-6 py-4 text-center text-primary">1.18</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex justify-end gap-3 print:hidden">
        <button className="flex items-center gap-2 px-6 py-3 border rounded-xl font-bold text-gray-600 hover:bg-gray-50">
          <Printer size={18} /> Print
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90">
          <Download size={18} /> Download PDF
        </button>
      </div>
    </div>
  );
};

export default StudentGradePortal;