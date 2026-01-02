import React from 'react';
import { ShieldAlert, Signal } from 'lucide-react';

const ProctoringDashboard = () => {
  const students = [
    { id: 1, name: 'Student A', status: 'Active', signal: 'Good' },
    { id: 2, name: 'Student B', status: 'Warning', signal: 'Weak' },
    { id: 3, name: 'Student C', status: 'Active', signal: 'Good' },
    { id: 4, name: 'Student D', status: 'Away', signal: 'Good' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {students.map((s) => (
        <div key={s.id} className="bg-black rounded-lg overflow-hidden relative aspect-video group">
          <img 
            src={`https://ui-avatars.com/api/?name=${s.name}&background=random`} 
            alt="Feed" 
            className={`w-full h-full object-cover opacity-80 group-hover:opacity-100 transition ${s.status === 'Away' ? 'blur-sm' : ''}`} 
          />
          
          <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${s.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {s.name}
          </div>

          <div className="absolute top-2 right-2 text-white">
             {s.signal === 'Weak' && <Signal size={14} className="text-red-500" />}
          </div>

          {s.status === 'Warning' && (
             <div className="absolute inset-0 border-4 border-red-500 flex items-center justify-center bg-black/40">
                <div className="flex flex-col items-center text-red-500 font-bold bg-black p-2 rounded">
                   <ShieldAlert size={24} />
                   <span className="text-xs">SUSPICIOUS ACTIVITY</span>
                </div>
             </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProctoringDashboard;