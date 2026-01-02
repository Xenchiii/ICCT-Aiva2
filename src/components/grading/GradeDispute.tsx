import React from 'react';
import { AlertTriangle, FileText, Send } from 'lucide-react';

const GradeDispute = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-red-50 text-red-600 rounded-xl">
          <AlertTriangle size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">File a Grade Dispute</h2>
          <p className="text-sm text-gray-500">
            Submit a formal request to review your final grade. This will be forwarded to your Professor and the Dean.
          </p>
        </div>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subject Code</label>
            <input type="text" placeholder="e.g. IT 302" className="w-full p-3 border rounded-xl bg-gray-50" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Current Grade</label>
            <input type="text" placeholder="e.g. 2.75" className="w-full p-3 border rounded-xl bg-gray-50" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Reason for Dispute</label>
          <select className="w-full p-3 border rounded-xl bg-gray-50">
            <option>Calculation Error</option>
            <option>Missing Project/Exam Score</option>
            <option>Attendance Discrepancy</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Supporting Evidence</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 cursor-pointer">
            <FileText className="mx-auto text-gray-400 mb-2" />
            <span className="text-sm font-bold text-primary">Upload Screenshots / Papers</span>
          </div>
        </div>

        <button className="w-full py-4 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition">
          <Send size={18} /> Submit Dispute Ticket
        </button>
      </form>
    </div>
  );
};

export default GradeDispute;