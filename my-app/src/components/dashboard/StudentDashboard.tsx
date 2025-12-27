import { Zap, Medal, Flame, Library, Target, TrendingUp, Calendar, Clock } from 'lucide-react';

interface Props {
  currentUser: any;
  badges: any[];
  challenges: any[];
  resources: any[];
  darkMode: boolean;
}

export default function StudentDashboard({
  currentUser,
  badges,
  challenges,
  resources,
  darkMode
}: Props) {
  const userLevel = currentUser?.level || 1;
  const userPoints = currentUser?.points || 0;
  const userStreak = currentUser?.streak || 0;
  const levelProgress = (userPoints % 100);

  const earnedBadges = badges.filter(b => b.earned).length;
  const activeChallenges = challenges.filter(c => !c.completed).slice(0, 3);
  // const recentResources = resources.slice(0, 4);

  const upcomingSchedule = [
    { subject: 'Mathematics', time: '9:00 AM', teacher: 'Prof. Santos', room: 'Room 301' },
    { subject: 'Physics', time: '11:00 AM', teacher: 'Prof. Cruz', room: 'Lab 2' },
    { subject: 'Programming', time: '2:00 PM', teacher: 'Prof. Reyes', room: 'CompLab' }
  ];


  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
      } text-white shadow-lg transform transition-all duration-300 hover:scale-[1.01]`}>
        <div className="flex items-center justify-between">
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold mb-2">Welcome, {currentUser?.name?.split(' ')[0] || 'Student'}! 👋</h2>
            <p className="text-blue-100">Ready to continue your learning journey?</p>
          </div>
          <div className="text-right animate-slideInRight">
            <p className="text-sm text-blue-100">Current Level</p>
            <p className="text-4xl font-bold">{userLevel}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total XP", value: userPoints, icon: Zap, color: "yellow" },
          { label: "Badges Earned", value: earnedBadges, icon: Medal, color: "purple" },
          { label: "Current Streak", value: `${userStreak} days`, icon: Flame, color: "orange" },
          { label: "Resources", value: resources.length, icon: Library, color: "blue" }
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="animate-slideUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <StatCard {...stat} darkMode={darkMode} />
          </div>
        ))}
      </div>

      {/* Level Progress */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300 hover:shadow-xl animate-fadeIn`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold">Level Progress</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {levelProgress} / 100 XP to Level {userLevel + 1}
            </p>
          </div>
          <TrendingUp className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'} animate-bounce`} />
        </div>
        
        <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
            style={{ width: `${levelProgress}%` }}
          >
            <span className="text-xs font-bold text-white">
              {levelProgress}%
            </span>
          </div>
        </div>
      </div>

      {/* Rest of the dashboard content with animations... */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Challenges */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300 hover:shadow-xl animate-slideInLeft`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="h-6 w-6 mr-2 text-green-600" />
            Active Challenges
          </h3>
          
          {activeChallenges.length === 0 ? (
            <div className="text-center py-8">
              <Target className={`h-12 w-12 mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'} animate-pulse`} />
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Loading challenges... Check the Gamification tab!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeChallenges.map((challenge: any) => (
                <ChallengeCard key={challenge.id} challenge={challenge} darkMode={darkMode} />
              ))}
            </div>
          )}
        </div>

        {/* Today's Schedule */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300 hover:shadow-xl animate-slideInRight`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-blue-600" />
            Today's Schedule
          </h3>
          
          <div className="space-y-3">
            {upcomingSchedule.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 border-blue-600 ${
                  darkMode ? 'bg-gray-750' : 'bg-blue-50'
                } transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">{item.subject}</p>
                  <div className="flex items-center space-x-1 text-blue-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.time}</span>
                  </div>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.teacher} • {item.room}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Start Learning", description: "Browse available courses", icon: "📚", color: "blue" },
          { title: "Play Games", description: "Earn XP by playing games", icon: "🎮", color: "purple" },
          { title: "Earn Badges", description: "Complete challenges", icon: "🏆", color: "yellow" }
        ].map((action, index) => (
          <div
            key={action.title}
            className="animate-slideUp"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <QuickActionCard {...action} darkMode={darkMode} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.5s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, darkMode }: any) {
  const colorMap: any = {
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    blue: 'text-blue-600'
  };

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <Icon className={`h-10 w-10 ${colorMap[color]} transition-transform duration-300 hover:scale-110`} />
      </div>
    </div>
  );
}

function ChallengeCard({ challenge, darkMode }: any) {
  const progress = challenge.progress || 0;
  const target = challenge.target || 100;
  const percentage = Math.min((progress / target) * 100, 100);

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'} transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{challenge.icon}</span>
          <div>
            <p className="font-medium text-sm">{challenge.title}</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {progress}/{target}
            </p>
          </div>
        </div>
        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-medium">
          +{challenge.reward} XP
        </span>
      </div>
      
      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-green-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function QuickActionCard({ title, description, icon, color, darkMode }: any) {
  const colorMap: any = {
    blue: darkMode ? 'from-blue-600 to-cyan-600' : 'from-blue-500 to-cyan-500',
    purple: darkMode ? 'from-purple-600 to-pink-600' : 'from-purple-500 to-pink-500',
    yellow: darkMode ? 'from-yellow-600 to-orange-600' : 'from-yellow-500 to-orange-500'
  };

  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${colorMap[color]} text-white shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 hover:scale-105`}>
      <div className="text-4xl mb-3 transition-transform duration-300 hover:scale-110">{icon}</div>
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <p className="text-sm text-white/90">{description}</p>
    </div>
  );
}





