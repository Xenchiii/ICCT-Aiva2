import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', logins: 400 },
  { name: 'Tue', logins: 300 },
  { name: 'Wed', logins: 550 },
  { name: 'Thu', logins: 480 },
  { name: 'Fri', logins: 390 },
  { name: 'Sat', logins: 150 },
  { name: 'Sun', logins: 100 },
];

const AnalyticsOverview = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold text-primary mb-6">Traffic Overview (Weekly)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#003049" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#003049" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
            <Tooltip />
            <Area type="monotone" dataKey="logins" stroke="#003049" fillOpacity={1} fill="url(#colorLogins)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsOverview;