import UserTable from './UserTable';
import { Search, Plus } from 'lucide-react';

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-primary">User Management</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm">
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, ID, or email..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:bg-white transition outline-none"
          />
        </div>
        <select className="p-2 border rounded-lg bg-gray-50 text-sm font-bold text-gray-600">
          <option>All Roles</option>
          <option>Student</option>
          <option>Professor</option>
          <option>Admin</option>
        </select>
      </div>

      <UserTable />
    </div>
  );
};

export default UserManagement;