import GradeDistributionChart from './GradeDistributionChart';
import { TrendingUp, AlertTriangle, Users } from 'lucide-react';

const GradeAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={20} /></div>
            <p className="text-xs font-bold text-gray-500 uppercase">Class Size</p>
          </div>
          <p className="text-3xl font-black text-primary">42</p>
          <p className="text-xs text-gray-400">Enrolled Students</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><TrendingUp size={20} /></div>
            <p className="text-xs font-bold text-gray-500 uppercase">Pass Rate</p>
          </div>
          <p className="text-3xl font-black text-primary">88%</p>
          <p className="text-xs text-green-600 font-bold">+2% vs Last Sem</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle size={20} /></div>
            <p className="text-xs font-bold text-gray-500 uppercase">At Risk</p>
          </div>
          <p className="text-3xl font-black text-red-600">5</p>
          <p className="text-xs text-gray-400">Students &lt; 3.0 GWA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-primary mb-6">Final Grade Distribution</h3>
          <GradeDistributionChart />
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-primary mb-4">Top Performers</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center font-bold text-sm">#{i}</div>
                  <span className="font-bold text-sm">Student Name {i}</span>
                </div>
                <span className="font-mono font-bold text-primary">1.00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeAnalytics;