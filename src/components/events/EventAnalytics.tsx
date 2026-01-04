import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DATA = [
  { name: 'BSIT', attendees: 120 },
  { name: 'BSCS', attendees: 98 },
  { name: 'BSBA', attendees: 45 },
  { name: 'Crim', attendees: 30 },
];

const EventAnalytics = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-6">Attendee Demographics</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip cursor={{fill: 'transparent'}} />
            <Bar dataKey="attendees" fill="#003049" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EventAnalytics;