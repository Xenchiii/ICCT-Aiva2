import { useState } from 'react';
import { Medal, Trophy, Award, Lock, Filter, Search, Crown, Star, Zap, Target, Gift, Check } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  earned?: boolean;
  claimed?: boolean;
  points_required?: number;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

interface Props {
  badges: Badge[];
  setBadges: (badges: Badge[]) => void;
  currentUser: any;
  darkMode: boolean;
}

export default function Badges({ badges, setBadges, currentUser, darkMode }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEarnedOnly, setShowEarnedOnly] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [claimedBadge, setClaimedBadge] = useState<string | null>(null);

  const userPoints = currentUser?.points || 0;

  // Auto-unlock badges based on user points
  const updatedBadges = badges.map(badge => {
    if (!badge.earned && badge.points_required && userPoints >= badge.points_required) {
      return { ...badge, earned: true };
    }
    return badge;
  });

  const categories = ['All', 'Academic Excellence', 'Consistency', 'Engagement', 'Special Recognition', 'Gaming Master'];

  const filteredBadges = updatedBadges.filter(badge => {
    const matchesCategory = selectedCategory === 'All' || badge.category === selectedCategory;
    const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         badge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEarned = !showEarnedOnly || badge.earned;
    return matchesCategory && matchesSearch && matchesEarned;
  });

  const earnedCount = updatedBadges.filter(b => b.earned).length;
  const unclaimedCount = updatedBadges.filter(b => b.earned && !b.claimed).length;
  const totalCount = updatedBadges.length;
  const progressPercentage = (earnedCount / totalCount) * 100;

  // Get rarity counts
  const rarityStats = {
    Common: updatedBadges.filter(b => b.rarity === 'Common' && b.earned).length,
    Rare: updatedBadges.filter(b => b.rarity === 'Rare' && b.earned).length,
    Epic: updatedBadges.filter(b => b.rarity === 'Epic' && b.earned).length,
    Legendary: updatedBadges.filter(b => b.rarity === 'Legendary' && b.earned).length
  };

  // Get unclaimed badges
  const unclaimedBadges = updatedBadges.filter(b => b.earned && !b.claimed).slice(0, 3);

  const handleClaimBadge = (badgeId: string) => {
    setBadges(updatedBadges.map(b => b.id === badgeId ? { ...b, claimed: true } : b));
    setClaimedBadge(badgeId);
    setTimeout(() => setClaimedBadge(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Claim Notification */}
      {claimedBadge && (
        <div className={`fixed top-6 right-6 ${darkMode ? 'bg-green-600' : 'bg-green-500'} text-white px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3 animate-fadeIn z-40`}>
          <Check className="h-6 w-6" />
          <span className="font-semibold">Badge claimed successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gradient-to-br from-yellow-600 to-orange-600' : 'bg-gradient-to-br from-yellow-500 to-orange-500'
      } text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Badge Collection</h2>
            <p className="text-yellow-100">Unlock achievements and showcase your progress</p>
          </div>
          <Trophy className="h-16 w-16 text-yellow-200" />
        </div>
      </div>

      {/* Unclaimed Badges Alert */}
      {unclaimedCount > 0 && (
        <div className={`p-4 rounded-xl border-2 flex items-center space-x-3 ${
          darkMode ? 'bg-blue-900/30 border-blue-600' : 'bg-blue-50 border-blue-200'
        }`}>
          <Gift className={`h-6 w-6 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <p className={`font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>You have {unclaimedCount} unclaimed badge{unclaimedCount !== 1 ? 's' : ''}!</p>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Scroll down to the "Ready to Claim" section to claim your rewards</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={Trophy}
          label="Total Badges"
          value={`${earnedCount}/${totalCount}`}
          color="yellow"
          darkMode={darkMode}
        />
        <StatCard
          icon={Crown}
          label="Legendary"
          value={rarityStats.Legendary}
          color="purple"
          darkMode={darkMode}
        />
        <StatCard
          icon={Star}
          label="Epic Badges"
          value={rarityStats.Epic}
          color="pink"
          darkMode={darkMode}
        />
        <StatCard
          icon={Zap}
          label="Collection %"
          value={`${Math.round(progressPercentage)}%`}
          color="blue"
          darkMode={darkMode}
        />
      </div>

      {/* Progress Overview */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold">Collection Progress</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {earnedCount} of {totalCount} badges earned
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-yellow-600">{earnedCount}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Badges</p>
          </div>
        </div>
        
        <div className={`rounded-full h-4 overflow-hidden mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div 
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
            style={{ width: `${progressPercentage}%` }}
          >
            {progressPercentage > 10 && (
              <span className="text-xs font-bold text-white">
                {Math.round(progressPercentage)}%
              </span>
            )}
          </div>
        </div>

        {/* Rarity Breakdown */}
        <div className="grid grid-cols-4 gap-3">
          <RarityCard label="Common" count={rarityStats.Common} color="gray" darkMode={darkMode} />
          <RarityCard label="Rare" count={rarityStats.Rare} color="blue" darkMode={darkMode} />
          <RarityCard label="Epic" count={rarityStats.Epic} color="purple" darkMode={darkMode} />
          <RarityCard label="Legendary" count={rarityStats.Legendary} color="yellow" darkMode={darkMode} />
        </div>
      </div>

      {/* Ready to Claim Section */}
      {unclaimedBadges.length > 0 && (
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-2 ${darkMode ? 'border-green-600' : 'border-green-200'}`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Gift className="h-6 w-6 mr-2 text-green-600" />
            Ready to Claim
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>These badges have been earned! Click "Claim" to add them to your collection.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {unclaimedBadges.map(badge => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border-2 ${
                  darkMode ? 'bg-gray-750 border-green-600' : 'bg-green-50 border-green-400'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-4xl">{badge.icon}</div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-600 text-white font-medium">
                    NEW
                  </span>
                </div>
                <p className="font-bold mb-1">{badge.name}</p>
                <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{badge.description}</p>
                <button
                  onClick={() => handleClaimBadge(badge.id)}
                  className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
                >
                  Claim Badge
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters & Search */}
      <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Filter */}
          <div className="flex items-center space-x-2 flex-1 min-w-[200px]">
            <Filter className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`flex-1 p-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center space-x-2 flex-1 min-w-[200px]">
            <Search className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <input
              type="text"
              placeholder="Search badges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 p-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'
              }`}
            />
          </div>

          {/* Toggle Earned Only */}
          <button
            onClick={() => setShowEarnedOnly(!showEarnedOnly)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              showEarnedOnly
                ? 'bg-yellow-600 text-white shadow-lg'
                : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
            }`}
          >
            {showEarnedOnly ? '✓ Earned Only' : 'Show All'}
          </button>
        </div>
      </div>

      {/* Badge Grid */}
      {filteredBadges.length === 0 ? (
        <div className={`p-12 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
          <Medal className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <h3 className="text-xl font-semibold mb-2">No badges found</h3>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBadges.map(badge => (
            <BadgeCard 
              key={badge.id} 
              badge={badge} 
              darkMode={darkMode}
              onClick={() => setSelectedBadge(badge)}
            />
          ))}
        </div>
      )}

      {/* Category Progress */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Target className="h-6 w-6 mr-2 text-blue-600" />
          Category Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.slice(1).map(category => {
            const categoryBadges = updatedBadges.filter(b => b.category === category);
            const earnedInCategory = categoryBadges.filter(b => b.earned).length;
            const categoryProgress = categoryBadges.length > 0 ? (earnedInCategory / categoryBadges.length) * 100 : 0;
            
            return (
              <div key={category} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-sm">{category}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {earnedInCategory}/{categoryBadges.length}
                  </span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${categoryProgress}%` }}
                  />
                </div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {Math.round(categoryProgress)}% Complete
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setSelectedBadge(null)}
        >
          <div 
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-md rounded-2xl shadow-2xl overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-6 ${
              selectedBadge.earned 
                ? 'bg-gradient-to-br from-yellow-500 to-orange-500' 
                : (darkMode ? 'bg-gray-750' : 'bg-gray-100')
            } text-center`}>
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl mb-4 ${
                selectedBadge.earned 
                  ? 'bg-white/20 backdrop-blur-sm shadow-xl' 
                  : (darkMode ? 'bg-gray-700' : 'bg-gray-200')
              }`}>
                {selectedBadge.earned ? selectedBadge.icon : <Lock className="h-12 w-12 text-gray-500" />}
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${selectedBadge.earned ? 'text-white' : (darkMode ? 'text-gray-300' : 'text-gray-700')}`}>
                {selectedBadge.name}
              </h3>
              {selectedBadge.rarity && (
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  selectedBadge.earned ? 'bg-white/20 text-white' : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
                }`}>
                  {selectedBadge.rarity}
                </span>
              )}
            </div>
            
            <div className="p-6">
              <p className={`text-center mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedBadge.description}
              </p>
              
              <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Category
                  </span>
                  <span className="font-semibold">{selectedBadge.category}</span>
                </div>
                {selectedBadge.points_required && (
                  <>
                    <div className={`h-px my-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Requirement
                      </span>
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 text-yellow-600" />
                        <span className="font-semibold">{selectedBadge.points_required} XP</span>
                      </div>
                    </div>
                  </>
                )}
                {selectedBadge.earned && (
                  <>
                    <div className={`h-px my-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Status
                      </span>
                      <span className="text-green-600 font-semibold flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        {selectedBadge.claimed ? 'Claimed!' : 'Ready to Claim'}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setSelectedBadge(null)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BadgeCard({ badge, darkMode, onClick }: { badge: Badge; darkMode: boolean; onClick: () => void }) {
  const isEarned = badge.earned;
  const isClaimed = badge.claimed;

  const rarityColors: any = {
    Common: darkMode ? 'border-gray-600' : 'border-gray-300',
    Rare: 'border-blue-500',
    Epic: 'border-purple-500',
    Legendary: 'border-yellow-500'
  };

  return (
    <div 
      onClick={onClick}
      className={`p-5 rounded-xl transition-all cursor-pointer border-2 relative ${
        isEarned
          ? `${rarityColors[badge.rarity || 'Common']} ${
              darkMode 
                ? 'bg-gradient-to-br from-yellow-600 to-orange-600 shadow-lg hover:shadow-xl' 
                : 'bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg hover:shadow-xl'
            } transform hover:-translate-y-1`
          : `${darkMode ? 'bg-gray-800 border-gray-700 opacity-70 hover:opacity-90' : 'bg-white border-gray-200 opacity-70 hover:opacity-90'}`
      }`}>
      {isEarned && !isClaimed && (
        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
          NEW
        </div>
      )}
      <div className="text-center">
        {/* Badge Icon */}
        <div className={`w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center text-4xl ${
          isEarned 
            ? 'bg-white/20 backdrop-blur-sm shadow-lg' 
            : (darkMode ? 'bg-gray-700' : 'bg-gray-200')
        }`}>
          {isEarned ? badge.icon : <Lock className="h-8 w-8 text-gray-500" />}
        </div>

        {/* Badge Name */}
        <h4 className={`font-bold mb-1 ${
          isEarned ? 'text-white' : (darkMode ? 'text-gray-400' : 'text-gray-600')
        }`}>
          {badge.name}
        </h4>

        {/* Badge Description */}
        <p className={`text-sm mb-3 line-clamp-2 ${
          isEarned ? 'text-white/80' : (darkMode ? 'text-gray-500' : 'text-gray-500')
        }`}>
          {badge.description}
        </p>

        {/* Rarity & Category */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          {badge.rarity && (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              isEarned
                ? 'bg-white/20 text-white'
                : (darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600')
            }`}>
              {badge.rarity}
            </span>
          )}
          <span className={`text-xs px-2 py-1 rounded-full ${
            isEarned
              ? 'bg-white/20 text-white'
              : (darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600')
          }`}>
            {badge.category}
          </span>
        </div>

        {/* Earned Status or Requirement */}
        {isEarned ? (
          <div className="flex items-center justify-center space-x-2 text-white/90">
            <Award className="h-4 w-4" />
            <span className="text-xs font-medium">{isClaimed ? 'Claimed!' : 'Ready to Claim'}</span>
          </div>
        ) : badge.points_required ? (
          <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} flex items-center justify-center`}>
            <Zap className="h-3 w-3 mr-1" />
            {badge.points_required} XP needed
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, darkMode }: any) {
  const colorMap: any = {
    yellow: { bg: 'from-yellow-500 to-orange-500', text: 'text-yellow-600' },
    purple: { bg: 'from-purple-600 to-pink-600', text: 'text-purple-600' },
    pink: { bg: 'from-pink-500 to-rose-500', text: 'text-pink-600' },
    blue: { bg: 'from-blue-600 to-cyan-600', text: 'text-blue-600' }
  };

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
          <p className={`text-3xl font-bold ${colorMap[color].text}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color].bg} flex items-center justify-center shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function RarityCard({ label, count, color, darkMode }: any) {
  const colorMap: any = {
    gray: darkMode ? 'text-gray-400' : 'text-gray-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    yellow: 'text-yellow-600'
  };

  return (
    <div className={`p-3 rounded-lg text-center ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
      <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}
      </p>
      <p className={`font-bold text-xl ${colorMap[color]}`}>{count}</p>
    </div>
  );
}