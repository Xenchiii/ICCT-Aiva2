import React from 'react';
import { Clock, ShieldAlert, User } from 'lucide-react';

const AuditLogs = () => {
  const logs = [
    { id: 1, action: 'User Login Failed', user: 'Unknown (IP: 192.168.1.1)', time: '10:42 AM', type: 'danger' },
    { id: 2, action: 'Role Updated', user: 'Admin', time: '10:15 AM', type: 'info' },
    { id: 3, action: 'New User Registered', user: 'System', time: '09:30 AM', type: 'success' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-primary mb-6">System Audit Logs</h2>
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className={`p-3 rounded-full ${
              log.type === 'danger' ? 'bg-red-100 text-red-600' : 
              log.type === 'info' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
            }`}>
              {log.type === 'danger' ? <ShieldAlert size={18} /> : <User size={18} />}
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800">{log.action}</p>
              <p className="text-xs text-gray-500">Actor: {log.user}</p>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs font-bold">
              <Clock size={14} /> {log.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLogs;