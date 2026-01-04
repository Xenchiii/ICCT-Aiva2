import { FileText, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ASSIGNMENTS = [
  { id: 1, title: 'Build a Personal Website', due: 'Oct 20, 11:59 PM', points: 100, status: 'Missing' },
  { id: 2, title: 'CSS Flexbox Froggy', due: 'Oct 15, 11:59 PM', points: 50, status: 'Submitted' },
];

const Assignment = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      {ASSIGNMENTS.map(a => (
        <div key={a.id} className="bg-white p-5 rounded-xl border border-gray-200 flex justify-between items-center hover:bg-gray-50 transition cursor-pointer"
             onClick={() => navigate(`/courses/1/assignments/${a.id}`)}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${a.status === 'Missing' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
              <FileText size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">{a.title}</h4>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Clock size={12} /> Due: {a.due} • {a.points} pts
              </p>
            </div>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${a.status === 'Missing' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {a.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Assignment;