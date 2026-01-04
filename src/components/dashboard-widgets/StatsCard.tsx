import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean; // true = green, false = red
  color?: string; // e.g., "bg-blue-50 text-blue-600"
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend, trendUp, color = "bg-blue-50 text-blue-600" }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-gray-800 mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default StatsCard;