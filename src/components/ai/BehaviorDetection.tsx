import React from 'react';
import { Eye, AlertOctagon, Monitor } from 'lucide-react';

const BehaviorDetection = () => {
  // Hardcoded events simulating detection logs
  const events = [
    { id: 1, type: 'warning', msg: 'Tab switch detected', time: '10:42 AM' },
    { id: 2, type: 'info', msg: 'Focus regained', time: '10:43 AM' },
    { id: 3, type: 'danger', msg: 'Multiple faces in frame', time: '10:55 AM' },
  ];

  return (
    <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-red-600">
        <Eye className="animate-pulse" size={20} />
        <h3 className="font-bold">Live Proctoring Logs</h3>
      </div>
      
      <div className="space-y-3">
        {events.map((e) => (
          <div key={e.id} className={`flex items-center gap-3 p-3 rounded-lg border ${
            e.type === 'danger' ? 'bg-red-50 border-red-200' : 
            e.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'
          }`}>
            {e.type === 'danger' ? <AlertOctagon size={16} className="text-red-600" /> : <Monitor size={16} className="text-gray-500" />}
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-800">{e.msg}</p>
              <p className="text-[10px] text-gray-500">{e.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BehaviorDetection;