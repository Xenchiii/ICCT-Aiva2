import { Clock, MousePointer, Activity } from 'lucide-react'; // FIX: Removed 'React' and unused 'BookOpen'

const EngagementTracking = () => {
  // Hardcoded engagement metrics
  const metrics = {
    dailyTime: '3h 42m',
    loginStreak: 12,
    moduleCompletion: 85, // percent
    lastActive: 'Just now'
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-primary flex items-center gap-2">
          <Activity size={18} className="text-secondary" /> Student Velocity
        </h3>
        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase">
          High Engagement
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Clock size={16} /> <span className="text-xs font-bold uppercase">Time Spent</span>
          </div>
          <p className="text-2xl font-black text-primary">{metrics.dailyTime}</p>
          <p className="text-[10px] text-green-600 font-medium">+15m vs yesterday</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <MousePointer size={16} /> <span className="text-xs font-bold uppercase">Interactions</span>
          </div>
          <p className="text-2xl font-black text-primary">1,240</p>
          <p className="text-[10px] text-gray-500 font-medium">Clicks & Scrolls</p>
        </div>
      </div>

      {/* Heatmap Simulation */}
      <div>
        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
          <span>Module Focus Heatmap</span>
          <span>Last 7 Days</span>
        </div>
        <div className="flex gap-1 h-8">
          {[2, 4, 1, 5, 5, 3, 5].map((level, i) => (
            <div 
              key={i} 
              className={`flex-1 rounded-sm ${
                level === 5 ? 'bg-[#003049]' : 
                level === 4 ? 'bg-[#265973]' : 
                level === 3 ? 'bg-[#4d829d]' : 
                'bg-gray-200'
              }`}
              title={`Day ${i+1}: Level ${level}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EngagementTracking;