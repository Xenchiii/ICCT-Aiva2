import { ShieldCheck, MessageSquare, Server, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support Ticket Summary */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <MessageSquare size={18} /> Support Queue
            </h3>
            <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded">12 OPEN</span>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                <div>
                  <p className="text-xs font-bold text-blue-600">ACADEMIC</p>
                  <p className="text-sm font-bold text-gray-800">Grade correction request for IT 302</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-medium">Ticket #INQ-{2025 + i}</p>
                  <p className="text-[10px] text-gray-500 italic">2h ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Logs & Integrity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <Server size={18} /> Integrity Logs
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 border-b border-gray-50">
              <AlertCircle size={16} className="text-red-500 shrink-0" />
              <div>
                <p className="text-xs font-bold">Unrecognized Face Detected</p>
                <p className="text-[10px] text-gray-500">Subject: CS 201 | Session: Lab Quiz 2</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 border-b border-gray-50">
              <ShieldCheck size={16} className="text-green-500 shrink-0" />
              <div>
                <p className="text-xs font-bold">System Backup Successful</p>
                <p className="text-[10px] text-gray-500">Cloudflare D1 Database</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;