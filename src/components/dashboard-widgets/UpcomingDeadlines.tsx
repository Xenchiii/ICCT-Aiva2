import { AlertCircle } from 'lucide-react';

const DEADLINES = [
  { id: 1, task: 'Web Dev Project', due: 'Today', urgency: 'high' },
  { id: 2, task: 'Data Struct Quiz', due: 'Tomorrow', urgency: 'medium' },
  { id: 3, task: 'Ethics Essay', due: 'In 3 days', urgency: 'low' },
];

const UpcomingDeadlines = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <AlertCircle size={18} className="text-red-500" /> Deadlines
      </h3>
      <div className="space-y-3">
        {DEADLINES.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-3 rounded-xl bg-gray-50">
            <div>
              <h4 className="text-sm font-bold text-gray-800">{item.task}</h4>
              <p className={`text-xs font-bold ${
                item.urgency === 'high' ? 'text-red-500' : 
                item.urgency === 'medium' ? 'text-orange-500' : 'text-blue-500'
              }`}>
                Due: {item.due}
              </p>
            </div>
            <div className={`h-2 w-2 rounded-full ${
               item.urgency === 'high' ? 'bg-red-500' : 
               item.urgency === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
            }`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;