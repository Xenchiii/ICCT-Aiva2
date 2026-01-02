import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import StudentDashboard from './StudentDashboard';
import ProfessorDashboard from './ProfessorDashboard';
import AdminDashboard from './AdminDashboard';
import { Loader2 } from 'lucide-react';

const DashboardRouter = () => {
  const { user, isLoading } = useAuth(); //

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
  switch (user?.role) {
    case 'Admin':
      return <AdminDashboard />;
    case 'Professor':
      return <ProfessorDashboard />;
    case 'Student':
    default:
      return <StudentDashboard />;
  }
};

export default DashboardRouter;