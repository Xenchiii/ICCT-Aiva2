import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { sem: '1st Year', gwa: 1.75 },
  { sem: '2nd Year', gwa: 1.50 },
  { sem: '3rd Year', gwa: 1.25 },
  { sem: 'Current', gwa: 1.25 },
];

const PerformanceGraph = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800">Academic Trajectory</h3>
        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Consistent</span>
      </div>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGwa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#003049" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#003049" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="sem" axisLine={false} tickLine={false} fontSize={12} stroke="#9ca3af" />
            <YAxis reversed domain={[1.0, 3.0]} axisLine={false} tickLine={false} fontSize={12} stroke="#9ca3af" />
            <Tooltip contentStyle={{ borderRadius: '10px', border: 'none' }} />
            <Area type="monotone" dataKey="gwa" stroke="#003049" strokeWidth={3} fillOpacity={1} fill="url(#colorGwa)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceGraph;