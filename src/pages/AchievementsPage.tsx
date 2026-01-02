import React from 'react';
import { Trophy, Star, Target } from 'lucide-react';

const AchievementsPage = () => {
  return (
    <div className="space-y-8">
      <div className="text-center py-10 bg-gradient-to-b from-yellow-50 to-transparent rounded-3xl">
        <Trophy className="mx-auto text-yellow-500 mb-4" size={64} />
        <h1 className="text-3xl font-black text-primary">Academic Excellence</h1>
        <p className="text-gray-500">Your milestones and recognized accomplishments.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Perfect Attendance', 'Dean\'s Lister', 'Top Coder', 'Event Volunteer'].map((badge) => (
          <div key={badge} className="bg-white p-6 rounded-2xl border-2 border-gray-50 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-3">
              <Star className="text-primary" />
            </div>
            <h4 className="text-sm font-bold">{badge}</h4>
            <p className="text-[10px] text-gray-400 mt-1">Unlocked Dec 2025</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;