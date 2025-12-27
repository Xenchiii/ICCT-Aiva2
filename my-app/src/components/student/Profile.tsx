import { Flame, Zap, Settings, Edit, Trophy, Medal, Award, BookOpen, Star } from 'lucide-react';

interface Props {
  currentUser: any;
  badges: any[];
  darkMode: boolean;
  setShowSettingsModal: (show: boolean) => void;
}

export default function Profile({ currentUser, badges, darkMode, setShowSettingsModal }: Props) {
  const defaultAvatar = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%236366f1"/%3E%3Ctext x="50" y="65" font-size="40" fill="white" text-anchor="middle"%3EU%3C/text%3E%3C/svg%3E';

  const earnedBadges = badges.filter(b => b.earned);
  const userLevel = currentUser?.level || 1;
  const userPoints = currentUser?.points || 0;
  const nextLevelPoints = userLevel * 100;
  const levelProgress = (userPoints % 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Profile Header */}
      <div className={`p-8 rounded-xl ${
        darkMode ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
      } text-white shadow-lg`}>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <img
              src={currentUser?.avatar_url || defaultAvatar}
              className="w-32 h-32 rounded-full ring-4 ring-white object-cover shadow-xl"
              alt={currentUser?.name}
            />
            <div className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-blue-600">{userLevel}</span>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{currentUser?.name}</h2>
            <p className="text-blue-100 mb-1">
              {currentUser?.role === 'student' ? '🎓 Student' : '👨‍🏫 Teacher'} • Level {userLevel}
            </p>
            <p className="text-blue-200 text-sm mb-4">{currentUser?.email}</p>
            
            {currentUser?.student_no && (
              <p className="text-blue-200 text-sm">Student ID: {currentUser.student_no}</p>
            )}
            {currentUser?.course && (
              <p className="text-blue-200 text-sm">{currentUser.course}</p>
            )}
            {currentUser?.department && (
              <p className="text-blue-200 text-sm">{currentUser.department}</p>
            )}
            
            <div className="flex items-center justify-center md:justify-start space-x-2 mt-4">
              <div className="flex items-center space-x-1 bg-white/20 px-3 py-1.5 rounded-lg">
                <Zap className="h-4 w-4 text-yellow-300" />
                <span className="font-semibold">{userPoints} XP</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/20 px-3 py-1.5 rounded-lg">
                <Flame className="h-4 w-4 text-orange-300" />
                <span className="font-semibold">{currentUser?.streak || 0} Day Streak</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold shadow-lg"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>

        {/* Level Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Level {userLevel}</span>
            <span>Level {userLevel + 1}</span>
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm mt-2 text-blue-100">
            {levelProgress} / {nextLevelPoints} XP to next level
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Achievements"
          icon={Trophy}
          color="yellow"
          darkMode={darkMode}
          stats={[
            { label: 'Total XP', value: userPoints },
            { label: 'Badges Earned', value: earnedBadges.length },
            { label: 'Current Streak', value: `${currentUser?.streak || 0} days` }
          ]}
        />
        
        <StatCard
          title="Learning Stats"
          icon={BookOpen}
          color="blue"
          darkMode={darkMode}
          stats={[
            { label: 'Courses Enrolled', value: 5 },
            { label: 'Assignments', value: 12 },
            { label: 'Study Hours', value: '45h' }
          ]}
        />
        
        <StatCard
          title="Community"
          icon={Star}
          color="purple"
          darkMode={darkMode}
          stats={[
            { label: 'Study Groups', value: 3 },
            { label: 'Messages', value: 28 },
            { label: 'Resources Shared', value: 8 }
          ]}
        />
      </div>

      {/* Earned Badges Showcase */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center">
            <Medal className="h-6 w-6 mr-2 text-yellow-600" />
            Badge Showcase ({earnedBadges.length})
          </h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All →
          </button>
        </div>

        {earnedBadges.length === 0 ? (
          <div className="text-center py-12">
            <Medal className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              No badges earned yet. Keep learning to earn your first badge!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {earnedBadges.slice(0, 6).map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-xl text-center transition-all hover:scale-110 cursor-pointer ${
                  darkMode ? 'bg-gradient-to-br from-yellow-600 to-orange-600' : 'bg-gradient-to-br from-yellow-400 to-orange-400'
                }`}
                title={`${badge.name} - ${badge.description}`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">{badge.icon}</span>
                </div>
                <p className="text-white text-xs font-semibold line-clamp-2">{badge.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { icon: '🎯', text: 'Completed 3 challenges', time: '2 hours ago', color: 'blue' },
            { icon: '🎖️', text: 'Earned "Quick Learner" badge', time: '5 hours ago', color: 'yellow' },
            { icon: '📚', text: 'Downloaded 2 study materials', time: 'Yesterday', color: 'green' },
            { icon: '✅', text: 'Submitted Programming assignment', time: '2 days ago', color: 'purple' },
            { icon: '🔥', text: 'Maintained 7-day streak', time: '3 days ago', color: 'orange' }
          ].map((activity, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 rounded-lg ${
                darkMode ? 'bg-gray-750' : 'bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                <span className="text-xl">{activity.icon}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.text}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Section */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Edit className="h-6 w-6 mr-2 text-blue-600" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
            darkMode ? 'border-gray-700 hover:border-blue-600' : 'border-gray-200 hover:border-blue-500'
          }`}>
            <Edit className={`h-6 w-6 mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <p className="font-medium text-sm">Edit Profile</p>
          </button>
          <button className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
            darkMode ? 'border-gray-700 hover:border-green-600' : 'border-gray-200 hover:border-green-500'
          }`}>
            <Award className={`h-6 w-6 mx-auto mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            <p className="font-medium text-sm">View Certificates</p>
          </button>
          <button className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
            darkMode ? 'border-gray-700 hover:border-purple-600' : 'border-gray-200 hover:border-purple-500'
          }`}>
            <Settings className={`h-6 w-6 mx-auto mb-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <p className="font-medium text-sm">Account Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, icon: Icon, color, darkMode, stats }: any) {
  const colorMap: any = {
    yellow: 'text-yellow-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600'
  };

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-12 h-12 rounded-lg bg-${color}-100 flex items-center justify-center`}>
          <Icon className={`h-6 w-6 ${colorMap[color]}`} />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="space-y-3">
        {stats.map((stat: any, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.label}
            </span>
            <span className="font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}