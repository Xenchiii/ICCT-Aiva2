import { useState, useEffect } from 'react';
import { Trophy, Gift, Zap, Target, TrendingUp, Award, Crown, Flame, Star, ShoppingCart, Lock, Check, X, Sparkles, Rocket } from 'lucide-react';

interface Reward {
  id: string;
  name: string;
  description: string;
  icon: any;
  cost: number;
  category?: string;
  inStock?: boolean;
  limited?: boolean;
}

interface Props {
  rewards: Reward[];
  currentUser: any;
  setCurrentUser: (user: any) => void;
  badges: any[];
  darkMode: boolean;
}

export default function Gamification({ rewards, currentUser, setCurrentUser, badges, darkMode }: Props) {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [redeemedItems, setRedeemedItems] = useState<string[]>([]);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // User Stats
  const userLevel = currentUser?.level || 1;
  const userPoints = currentUser?.points || 0;
  const userStreak = currentUser?.streak || 0;
  const earnedBadges = badges.filter(b => b.earned).length;
  const totalBadges = badges.length;
  
  // Level Calculations
  const pointsForNextLevel = userLevel * 100;
  const currentLevelPoints = userPoints % 100;
  const levelProgressPercent = (currentLevelPoints / pointsForNextLevel) * 100;

  // Check if user leveled up
  useEffect(() => {
    const newLevel = Math.floor(userPoints / 100) + 1;
    if (newLevel > userLevel) {
      setCurrentUser({ ...currentUser, level: newLevel });
    }
  }, [userPoints]);

  // Redeem Reward Handler
  const handleRedeemReward = (reward: Reward) => {
    if (userPoints < reward.cost) {
      return;
    }

    setCurrentUser({
      ...currentUser,
      points: userPoints - reward.cost
    });

    setRedeemedItems([...redeemedItems, reward.id]);
    setShowSuccessAnimation(true);
    
    setTimeout(() => {
      setShowSuccessAnimation(false);
      setShowRedeemModal(false);
      setSelectedReward(null);
    }, 2000);
  };

  const openRedeemModal = (reward: Reward) => {
    setSelectedReward(reward);
    setShowRedeemModal(true);
  };

  const closeRedeemModal = () => {
    setShowRedeemModal(false);
    setSelectedReward(null);
  };

  // Filter rewards
  const filteredRewards = filterCategory === 'all' 
    ? rewards 
    : rewards.filter(r => r.category === filterCategory);

  // Sort rewards by cost
  const sortedRewards = [...filteredRewards].sort((a, b) => a.cost - b.cost);

  // Calculate statistics
  const totalXpEarned = userPoints + (redeemedItems.length * 50); // Estimate
  const badgeCompletionPercent = totalBadges > 0 ? (earnedBadges / totalBadges) * 100 : 0;
  const globalRank = Math.max(1, Math.ceil(85 - (userLevel * 5)));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Header */}
      <div className={`relative p-8 rounded-2xl overflow-hidden ${
        darkMode ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600' : 'bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500'
      } text-white shadow-2xl`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Trophy className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Gamification Hub</h2>
                <p className="text-purple-100">Transform learning into an adventure</p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <p className="text-sm text-purple-100">Total Balance</p>
                <p className="text-3xl font-bold">{userPoints} XP</p>
              </div>
            </div>
          </div>

          {/* Quick Achievement Banner */}
          {earnedBadges > 0 && (
            <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Sparkles className="h-6 w-6" />
                <div>
                  <p className="font-semibold">Keep Going!</p>
                  <p className="text-sm text-purple-100">You've earned {earnedBadges} badges so far</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="h-5 w-5" />
                <span className="font-bold">{userStreak} Day Streak</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          icon={Crown}
          label="Current Level"
          value={userLevel}
          color="purple"
          trend="+1 this week"
          darkMode={darkMode}
        />
        <StatsCard
          icon={Zap}
          label="Total XP"
          value={userPoints}
          color="yellow"
          trend={`${currentLevelPoints}/${pointsForNextLevel}`}
          darkMode={darkMode}
        />
        <StatsCard
          icon={Award}
          label="Badges Earned"
          value={earnedBadges}
          color="blue"
          trend={`${earnedBadges}/${totalBadges} unlocked`}
          darkMode={darkMode}
        />
        <StatsCard
          icon={Flame}
          label="Day Streak"
          value={userStreak}
          color="orange"
          trend={userStreak > 0 ? '🔥 On fire!' : 'Start today!'}
          darkMode={darkMode}
        />
      </div>

      {/* Level Progress Section */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold flex items-center space-x-2">
              <span>Level {userLevel}</span>
              <span className="text-purple-600">→</span>
              <span className="text-gray-500">Level {userLevel + 1}</span>
            </h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {currentLevelPoints} / {pointsForNextLevel} XP
            </p>
          </div>
          <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
            <p className="text-xs text-purple-600 font-medium">Next Reward: 🎁 Special Badge</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-6">
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${Math.min(levelProgressPercent, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <div className="absolute -top-1 right-0 transform translate-x-2">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
              {Math.round(levelProgressPercent)}%
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <QuickStat
            icon={TrendingUp}
            label="XP to Next Level"
            value={`${pointsForNextLevel - currentLevelPoints}`}
            color="green"
            darkMode={darkMode}
          />
          <QuickStat
            icon={Target}
            label="Daily Goal Progress"
            value={`${Math.min(Math.round((userPoints % 100) / 1), 100)}%`}
            color="blue"
            darkMode={darkMode}
          />
          <QuickStat
            icon={Star}
            label="Global Rank"
            value={`Top ${globalRank}%`}
            color="yellow"
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Rewards Store */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Rewards Store</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {rewards.length} rewards available
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5 text-purple-600" />
            <span className="font-bold text-xl text-purple-600">{userPoints} XP</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
          <CategoryButton
            label="All"
            active={filterCategory === 'all'}
            onClick={() => setFilterCategory('all')}
            darkMode={darkMode}
          />
          <CategoryButton
            label="Cosmetic"
            active={filterCategory === 'cosmetic'}
            onClick={() => setFilterCategory('cosmetic')}
            darkMode={darkMode}
          />
          <CategoryButton
            label="Boosts"
            active={filterCategory === 'boost'}
            onClick={() => setFilterCategory('boost')}
            darkMode={darkMode}
          />
          <CategoryButton
            label="Exclusive"
            active={filterCategory === 'exclusive'}
            onClick={() => setFilterCategory('exclusive')}
            darkMode={darkMode}
          />
        </div>

        {/* Rewards Grid */}
        {sortedRewards.length === 0 ? (
          <div className="text-center py-16">
            <Gift className={`h-20 w-20 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <h4 className="text-xl font-semibold mb-2">No Rewards Available</h4>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Check back later for exciting new rewards!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedRewards.map(reward => (
              <RewardCard
                key={reward.id}
                reward={reward}
                userPoints={userPoints}
                darkMode={darkMode}
                onRedeem={() => openRedeemModal(reward)}
                isRedeemed={redeemedItems.includes(reward.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Grid: Achievements & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-yellow-600" />
              <h3 className="text-lg font-bold">Recent Achievements</h3>
            </div>
            <span className={`text-sm px-3 py-1 rounded-full ${
              darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-50 text-yellow-700'
            }`}>
              {earnedBadges} Unlocked
            </span>
          </div>

          <div className="space-y-3">
            {badges.filter(b => b.earned).slice(0, 5).map((badge, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  darkMode ? 'bg-gray-750 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                } transition-colors cursor-pointer`}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">{badge.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{badge.name}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                    {badge.description}
                  </p>
                </div>
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
              </div>
            ))}
            
            {earnedBadges === 0 && (
              <div className="text-center py-8">
                <Award className={`h-12 w-12 mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  No achievements yet. Start learning to unlock badges!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Goals & Milestones */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center space-x-2 mb-6">
            <Target className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-bold">Goals & Milestones</h3>
          </div>

          <div className="space-y-4">
            <GoalCard
              title="Reach Level 5"
              description="Unlock special avatar frames"
              current={userLevel}
              target={5}
              reward="200 XP + Avatar Frame"
              icon={Crown}
              darkMode={darkMode}
            />
            <GoalCard
              title="Earn 10 Badges"
              description="Become a Badge Master"
              current={earnedBadges}
              target={10}
              reward="Badge Master Title"
              icon={Award}
              darkMode={darkMode}
            />
            <GoalCard
              title="7-Day Streak"
              description="Consistency is key!"
              current={userStreak}
              target={7}
              reward="Consistency Badge + 100 XP"
              icon={Flame}
              darkMode={darkMode}
            />
            <GoalCard
              title="Collect 1000 XP"
              description="Master of experience"
              current={userPoints}
              target={1000}
              reward="XP Master Badge"
              icon={Zap}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center space-x-2 mb-6">
          <Rocket className="h-6 w-6 text-purple-600" />
          <h3 className="text-lg font-bold">Performance Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard
            label="Total XP Earned"
            value={totalXpEarned}
            icon="📈"
            trend="+15% this week"
            darkMode={darkMode}
          />
          <InsightCard
            label="Badge Completion"
            value={`${Math.round(badgeCompletionPercent)}%`}
            icon="🏆"
            trend={`${earnedBadges}/${totalBadges} badges`}
            darkMode={darkMode}
          />
          <InsightCard
            label="Items Redeemed"
            value={redeemedItems.length}
            icon="🎁"
            trend="Total rewards claimed"
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Redeem Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden`}>
            {/* Success Animation */}
            {showSuccessAnimation && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <Check className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
                  <p className="text-white/80">Reward redeemed successfully</p>
                </div>
              </div>
            )}

            {/* Modal Header */}
            <div className="relative p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <selectedReward.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{selectedReward.name}</h3>
                <p className="text-purple-100">{selectedReward.description}</p>
                {selectedReward.limited && (
                  <div className="mt-3 inline-block px-3 py-1 bg-red-500 rounded-full text-xs font-bold">
                    ⚡ LIMITED TIME
                  </div>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className={`p-5 rounded-xl mb-6 ${
                darkMode ? 'bg-gray-750' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Reward Cost
                  </span>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-600">{selectedReward.cost}</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>XP</span>
                  </div>
                </div>

                <div className="h-px bg-gray-300 my-4"></div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your Balance
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-2xl font-bold ${
                      userPoints >= selectedReward.cost ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {userPoints}
                    </span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>XP</span>
                  </div>
                </div>

                {userPoints >= selectedReward.cost && (
                  <>
                    <div className="h-px bg-gray-300 my-4"></div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        After Purchase
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">
                          {userPoints - selectedReward.cost}
                        </span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>XP</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {userPoints < selectedReward.cost && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <X className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-red-800 font-semibold text-sm">Insufficient XP</p>
                    <p className="text-red-700 text-xs mt-1">
                      You need <strong>{selectedReward.cost - userPoints} more XP</strong> to redeem this reward.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={closeRedeemModal}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRedeemReward(selectedReward)}
                  disabled={userPoints < selectedReward.cost}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                    userPoints >= selectedReward.cost
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {userPoints >= selectedReward.cost ? '🎉 Redeem Now' : '🔒 Locked'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Stats Card Component
function StatsCard({ icon: Icon, label, value, color, trend, darkMode }: any) {
  const colorMap: any = {
    purple: { bg: 'from-purple-600 to-pink-600', text: 'text-purple-600' },
    yellow: { bg: 'from-yellow-500 to-orange-500', text: 'text-yellow-600' },
    blue: { bg: 'from-blue-600 to-cyan-600', text: 'text-blue-600' },
    orange: { bg: 'from-orange-600 to-red-600', text: 'text-orange-600' }
  };

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color].bg} flex items-center justify-center shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          {trend}
        </span>
      </div>
      <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
        {label}
      </p>
      <p className={`text-3xl font-bold ${colorMap[color].text}`}>{value}</p>
    </div>
  );
}

// Quick Stat Component
function QuickStat({ icon: Icon, label, value, color, darkMode }: any) {
  const colorMap: any = {
    green: darkMode ? 'text-green-400' : 'text-green-600',
    blue: darkMode ? 'text-blue-400' : 'text-blue-600',
    yellow: darkMode ? 'text-yellow-400' : 'text-yellow-600'
  };

  return (
    <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
      <Icon className={`h-6 w-6 mx-auto mb-2 ${colorMap[color]}`} />
      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{label}</p>
      <p className="font-bold text-lg">{value}</p>
    </div>
  );
}

// Category Button Component
function CategoryButton({ label, active, onClick, darkMode }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
        active
          ? 'bg-purple-600 text-white shadow-lg'
          : darkMode
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}

// Reward Card Component
function RewardCard({ reward, userPoints, darkMode, onRedeem, isRedeemed }: any) {
  const canAfford = userPoints >= reward.cost;
  const Icon = reward.icon;

  return (
    <div className={`p-5 rounded-xl border-2 transition-all hover:shadow-xl relative overflow-hidden ${
      isRedeemed
        ? (darkMode ? 'border-green-600 bg-gray-750 opacity-60' : 'border-green-500 bg-green-50 opacity-60')
        : canAfford
        ? (darkMode ? 'border-purple-600 bg-gray-750 hover:border-purple-500' : 'border-purple-400 bg-white hover:border-purple-500')
        : (darkMode ? 'border-gray-700 bg-gray-750 opacity-60' : 'border-gray-200 bg-white opacity-60')
    }`}>
      {reward.limited && !isRedeemed && (
        <div className="absolute top-2 right-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            LIMITED
          </span>
        </div>
      )}

      {isRedeemed && (
        <div className="absolute top-2 right-2">
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center">
            <Check className="h-3 w-3 mr-1" />
            OWNED
          </span>
        </div>
      )}

      <div className="flex items-start space-x-4 mb-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
          isRedeemed
            ? 'bg-green-500'
            : canAfford
            ? 'bg-gradient-to-br from-purple-600 to-pink-600'
            : (darkMode ? 'bg-gray-700' : 'bg-gray-200')
        }`}>
          <Icon className={`h-7 w-7 ${(canAfford || isRedeemed) ? 'text-white' : 'text-gray-400'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold mb-1 truncate">{reward.name}</h4>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
            {reward.description}
          </p>
        </div>
      </div>

      <div className={`flex items-center justify-between pt-4 border-t-2 ${
        darkMode ? 'border-gray-700' : 'border-gray-100'
      }`}>
        <div className="flex items-center space-x-2">
          <Zap className={`h-5 w-5 ${canAfford && !isRedeemed ? 'text-purple-600' : 'text-gray-400'}`} />
          <span className={`font-bold text-lg ${canAfford && !isRedeemed ? 'text-purple-600' : 'text-gray-400'}`}>
            {reward.cost}
          </span>
        </div>
        <button
          onClick={onRedeem}
          disabled={!canAfford || isRedeemed}
          className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
            isRedeemed
              ? 'bg-green-500 text-white cursor-default'
              : canAfford
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isRedeemed ? 'Owned' : canAfford ? 'Redeem' : <Lock className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

// Goal Card Component
function GoalCard({ title, description, current, target, reward, icon: Icon, darkMode }: any) {
  const progress = Math.min((current / target) * 100, 100);
  const isCompleted = current >= target;

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'} hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isCompleted 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : (darkMode ? 'bg-gray-700' : 'bg-gray-200')
          }`}>
            <Icon className={`h-5 w-5 ${isCompleted ? 'text-white' : 'text-gray-500'}`} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm mb-1">{title}</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {description}
            </p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          isCompleted 
            ? 'bg-green-100 text-green-700' 
            : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
        }`}>
          {current}/{target}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600'
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          Reward: {reward}
        </p>
        {isCompleted && (
          <Check className="h-5 w-5 text-green-600" />
        )}
      </div>
    </div>
  );
}

// Insight Card Component
function InsightCard({ label, value, icon, trend, darkMode }: any) {
  return (
    <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'} hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${
          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
        }`}>
          {trend}
        </span>
      </div>
      <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}
      </p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}