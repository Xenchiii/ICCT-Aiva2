import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Present', value: 85, color: '#10b981' }, // Green
  { name: 'Late', value: 10, color: '#f59e0b' },    // Yellow
  { name: 'Absent', value: 5, color: '#ef4444' },   // Red
];

const ChartWidget = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
      <h3 className="font-bold text-gray-800 mb-2">Attendance Summary</h3>
      <div className="h-[200px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-3xl font-black text-gray-800">95%</span>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Rate</p>
        </div>
      </div>
    </div>
  );
};

export default ChartWidget;