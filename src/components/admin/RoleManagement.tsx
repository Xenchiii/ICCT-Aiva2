import React from 'react';
import { Shield, Lock } from 'lucide-react';

const RoleManagement = () => {
  const roles = [
    { name: 'Administrator', users: 3, level: 'Full Access' },
    { name: 'Professor', users: 42, level: 'Academic Access' },
    { name: 'Officer', users: 15, level: 'Limited Admin' },
    { name: 'Student', users: 1180, level: 'Read Only' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {roles.map((role) => (
        <div key={role.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
              <Shield size={24} />
            </div>
            <Lock size={16} className="text-gray-300" />
          </div>
          <h3 className="font-bold text-xl text-primary">{role.name}</h3>
          <p className="text-sm text-gray-500 mb-4">{role.level}</p>
          <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
            <span className="font-bold text-gray-800">{role.users} Users</span>
            <button className="text-blue-600 text-xs font-bold">Edit Permissions</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleManagement;