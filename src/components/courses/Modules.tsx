import ModuleItem from './ModuleItem';
import './Modules.css';

const Modules = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Module 1 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Week 1: Introduction to HTML5</h3>
          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">Completed</span>
        </div>
        <div className="divide-y divide-gray-50">
          <ModuleItem title="Lecture 1: History of the Web" type="video" completed />
          <ModuleItem title="Reading: HTML Semantics" type="reading" completed />
          <ModuleItem title="Quiz 1: Basic Tags" type="quiz" completed />
        </div>
      </div>

      {/* Module 2 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Week 2: CSS Fundamentals</h3>
          <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">In Progress</span>
        </div>
        <div className="divide-y divide-gray-50">
          <ModuleItem title="Lecture 2: The Box Model" type="video" />
          <ModuleItem title="Lab Exercise: Styling a Resume" type="reading" />
        </div>
      </div>
    </div>
  );
};

export default Modules;