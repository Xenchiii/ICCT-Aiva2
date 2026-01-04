import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { category: 'Academic', count: 45 },
  { category: 'Technical', count: 12 },
  { category: 'Behavioral', count: 3 },
  { category: 'General', count: 18 },
];

const InquiryAnalytics = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-primary mb-6">Inquiry Volume by Category</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
            <Tooltip cursor={{fill: 'transparent'}} />
            <Bar dataKey="count" fill="#003049" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InquiryAnalytics;