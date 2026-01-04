import { Clock } from 'lucide-react';

const ACTIVITIES = [
  { id: 1, text: 'Submitted Midterm Project', time: '2 hrs ago', course: 'IT 302' },
  { id: 2, text: 'Paid Tuition Fee', time: '1 day ago', course: 'Finance' },
  { id: 3, text: 'Downloaded Syllabus', time: '2 days ago', course: 'CS 201' },
];

const RecentActivity = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Clock size={18} className="text-primary" /> Recent Activity
      </h3>
      <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
        {ACTIVITIES.map((activity) => (
          <div key={activity.id} className="ml-6 relative">
            <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-white bg-primary"></span>
            <p className="text-sm font-semibold text-gray-800">{activity.text}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{activity.course}</span>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;