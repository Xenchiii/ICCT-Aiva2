import { useAuth } from '@/hooks/useAuth';
import { User, Mail, GraduationCap, Calendar } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth(); //

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 border-4 border-secondary overflow-hidden">
          <img src={user?.photoUrl || `https://ui-avatars.com/api/?name=${user?.fullName}`} alt="Profile" />
        </div>
        <h1 className="text-2xl font-bold text-primary">{user?.fullName}</h1>
        <p className="text-gray-400">{user?.id}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        <div className="p-4 flex items-center gap-4">
          <GraduationCap className="text-accent" />
          <div><p className="text-xs text-gray-400">Course & Year</p><p className="font-medium">{user?.role} - {user?.programCode}</p></div>
        </div>
        <div className="p-4 flex items-center gap-4">
          <Mail className="text-accent" />
          <div><p className="text-xs text-gray-400">Email Address</p><p className="font-medium">{user?.email}</p></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;