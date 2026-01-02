import React from 'react';
import { Check, X, FileText } from 'lucide-react';

const ApplicationReview = () => {
  const applications = [
    { id: 'APP-001', applicant: 'Maria Clara', type: 'Membership', org: 'CES', date: 'Jan 2, 2026' },
    { id: 'APP-002', applicant: 'Jose Rizal', type: 'Officer Role', org: 'ICSO', date: 'Jan 1, 2026' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-primary">Pending Applications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">{app.id}</span>
                <h3 className="font-bold text-lg text-primary">{app.applicant}</h3>
                <p className="text-sm text-gray-500">Applying for: <span className="font-bold">{app.type} ({app.org})</span></p>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FileText size={20} />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button className="flex-1 py-2 border border-red-200 text-red-600 rounded-lg font-bold hover:bg-red-50 flex items-center justify-center gap-2">
                <X size={16} /> Reject
              </button>
              <button className="flex-1 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2">
                <Check size={16} /> Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationReview;