import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { Trophy, TrendingUp, AlertTriangle } from 'lucide-react';

const PerformanceAnalytics = () => {
  // Hardcoded Mock Data: Simulates student's skill distribution
  const data = [
    { subject: 'Coding', A: 120, fullMark: 150 },
    { subject: 'Logic', A: 98, fullMark: 150 },
    { subject: 'UI/UX', A: 86, fullMark: 150 },
    { subject: 'Math', A: 65, fullMark: 150 }, // Weak area
    { subject: 'Theory', A: 85, fullMark: 150 },
    { subject: 'DevOps', A: 100, fullMark: 150 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-primary">Skill Proficiency</h3>
          <p className="text-xs text-gray-500">Holistic analysis of your performance</p>
        </div>
        <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
          <Trophy size={20} />
        </div>
      </div>

      <div className="h-[300px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 'bold' }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar name="My Score" dataKey="A" stroke="#003049" fill="#003049" fillOpacity={0.3} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>

        {/* AI Insight Overlay */}
        <div className="absolute bottom-0 right-0 p-3 bg-red-50 border border-red-100 rounded-xl max-w-[180px]">
          <div className="flex items-center gap-2 mb-1 text-red-600 font-bold text-xs">
            <AlertTriangle size={12} /> Weakness Detected
          </div>
          <p className="text-[10px] text-gray-600 leading-tight">
            Your <b>Math</b> score is 20% lower than the class average. Consider reviewing "Linear Algebra" modules.
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-green-200 text-green-700 rounded-full">
                <TrendingUp size={16} />
            </div>
            <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Top Skill</p>
                <p className="font-bold text-primary">Coding (React/TS)</p>
            </div>
        </div>
        <span className="text-2xl font-black text-green-600">Top 5%</span>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;