import { CheckCircle2 } from 'lucide-react';

const RubricViewer = () => {
  // Hardcoded rubric data
  const criteria = [
    { title: 'Functionality', points: 40, desc: 'Code runs without errors and meets all requirements.' },
    { title: 'Code Quality', points: 30, desc: 'Proper indentation, variable naming, and comments.' },
    { title: 'UI/UX Design', points: 20, desc: 'Interface is intuitive and visually appealing.' },
    { title: 'Documentation', points: 10, desc: 'README file and submission details are complete.' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-primary">Project Rubric: Web Dev Finals</h3>
        <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Total: 100 pts</span>
      </div>

      <div className="space-y-4">
        {criteria.map((c, idx) => (
          <div key={idx} className="flex gap-4 p-4 border rounded-xl hover:border-primary transition group cursor-default">
            <div className="mt-1">
              <CheckCircle2 className="text-gray-300 group-hover:text-green-500 transition" size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <h4 className="font-bold text-gray-800">{c.title}</h4>
                <span className="font-bold text-primary">{c.points} pts</span>
              </div>
              <p className="text-sm text-gray-500">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RubricViewer;