import { MoreVertical, Shield } from 'lucide-react';

const UserTable = () => {
  // Hardcoded Users
  const users = [
    { id: '2023-01025', name: 'League, Jame', email: 'jame@icct.edu.ph', role: 'Student', status: 'Active' },
    { id: 'FAC-00412', name: 'Cruz, Juan', email: 'j.cruz@icct.edu.ph', role: 'Professor', status: 'Active' },
    { id: 'ADM-001', name: 'System Admin', email: 'admin@icct.edu.ph', role: 'Admin', status: 'Active' },
    { id: '2023-09999', name: 'Doe, John', email: 'j.doe@icct.edu.ph', role: 'Student', status: 'Suspended' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-xs">
          <tr>
            <th className="px-6 py-4">User Info</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">
                <p className="font-bold text-gray-800">{u.name}</p>
                <p className="text-xs text-gray-500">{u.email} • {u.id}</p>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-xs font-bold text-gray-600">
                  <Shield size={10} /> {u.role}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                  u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {u.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-primary"><MoreVertical size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;