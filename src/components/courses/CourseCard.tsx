import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock } from 'lucide-react';
import './CourseCard.css';

interface CourseProps {
  id: string;
  code: string;
  title: string;
  instructor: string;
  schedule: string;
  color: string;
}

const CourseCard: React.FC<CourseProps> = ({ id, code, title, instructor, schedule, color }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/courses/${id}`)}
      className="course-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer h-full flex flex-col"
    >
      <div className={`h-24 ${color} p-4 text-white flex flex-col justify-between`}>
        <span className="text-xs font-bold opacity-80">{code}</span>
        <h3 className="font-bold text-lg leading-tight">{title}</h3>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">{instructor}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock size={14} /> {schedule}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
          <BookOpen size={18} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;