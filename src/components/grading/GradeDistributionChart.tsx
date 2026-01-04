import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { grade: '1.00', count: 5 },
  { grade: '1.25', count: 8 },
  { grade: '1.50', count: 12 },
  { grade: '1.75', count: 6 },
  { grade: '2.00', count: 4 },
  { grade: '2.25', count: 3 },
  { grade: '2.50', count: 2 },
  { grade: '3.00', count: 2 },
  { grade: '5.00', count: 1 }, // Fail
];

const GradeDistributionChart = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="grade" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold'}} />
          <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip 
            cursor={{fill: '#f8fafc'}}
            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.grade === '5.00' ? '#ef4444' : '#003049'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradeDistributionChart;