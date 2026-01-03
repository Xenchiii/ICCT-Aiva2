import { TrendingUp, CreditCard } from 'lucide-react';

const FinanceOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">Total Revenue</p>
          <p className="text-3xl font-black text-green-600">₱842,500</p>
          <div className="flex items-center gap-1 text-xs text-green-600 font-bold mt-2">
            <TrendingUp size={14} /> +12% this month
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase">Pending Payments</p>
          <p className="text-3xl font-black text-orange-500">₱45,200</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 font-bold mt-2">
            <CreditCard size={14} /> 18 Transactions
          </div>
        </div>
      </div>
      
      {/* Transaction List could go here */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100">
        <h3 className="font-bold text-primary mb-4">Recent Transactions</h3>
        <p className="text-gray-400 text-sm italic">No recent transactions to display.</p>
      </div>
    </div>
  );
};

export default FinanceOverview;