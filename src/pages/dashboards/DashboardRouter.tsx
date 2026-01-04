import { useAuth } from '@/hooks/useAuth';
import StudentDashboard from './StudentDashboard';
import ProfessorDashboard from './ProfessorDashboard';
import AdminDashboard from './AdminDashboard';
import { Loader2 } from 'lucide-react';

const DashboardRouter = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-gray-500 font-medium">Verifying credentials...</p>
      </div>
    );
  }

  /**
   * Role-Based Access Control (RBAC)
   * Directs user to their specialized cockpit based on account type.
   */
  // FIX: Changed cases to lowercase to match the 'User' interface definition
  // 'Professor' was also mapped to 'faculty'
  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'faculty': 
      return <ProfessorDashboard />;
    case 'student':
    default:
      return <StudentDashboard />;
  }
};

export default DashboardRouter;