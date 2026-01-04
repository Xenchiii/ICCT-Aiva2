import { BookOpen, CreditCard, FileText, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActionsWidget = () => {
  const navigate = useNavigate();

  const actions = [
    { label: 'Grades', icon: FileText, path: '/grades', color: 'bg-blue-50 text-blue-600' },
    { label: 'Enroll', icon: BookOpen, path: '/enrollment', color: 'bg-green-50 text-green-600' },
    { label: 'Payment', icon: CreditCard, path: '/finance', color: 'bg-purple-50 text-purple-600' },
    { label: 'Help', icon: HelpCircle, path: '/inquiries', color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition border border-transparent hover:border-gray-200"
          >
            <div className={`p-2 rounded-lg mb-2 ${action.color}`}>
              <action.icon size={20} />
            </div>
            <span className="text-xs font-bold text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsWidget;