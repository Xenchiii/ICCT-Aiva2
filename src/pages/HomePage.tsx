import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGrades } from '@/hooks/useGrades';
import { BookOpen, Trophy, HelpCircle } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();
  const { gwa } = useGrades();

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="bg-primary p-8 rounded-2xl text-white shadow-lg">
        <h1 className="text-3xl font-bold">Welcome back, {user?.fullName}!</h1>
        <p className="opacity-80 mt-2">You currently have a GWA of {gwa}. Keep up the great work!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <BookOpen className="text-blue-600 mb-4" />
          <h3 className="font-bold">Active Subjects</h3>
          <p className="text-2xl font-bold text-primary">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <Trophy className="text-yellow-500 mb-4" />
          <h3 className="font-bold">Achievements</h3>
          <p className="text-2xl font-bold text-primary">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <HelpCircle className="text-green-500 mb-4" />
          <h3 className="font-bold">Pending Inquiries</h3>
          <p className="text-2xl font-bold text-primary">1</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;