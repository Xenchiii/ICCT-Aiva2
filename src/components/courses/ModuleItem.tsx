import { FileText, PlayCircle, CheckCircle } from 'lucide-react';
import './ModuleItem.css';

interface ModuleItemProps {
  title: string;
  type: 'video' | 'reading' | 'quiz';
  completed?: boolean;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ title, type, completed }) => {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer group">
      <div className="flex items-center gap-3">
        {type === 'video' ? <PlayCircle size={16} className="text-blue-500" /> : <FileText size={16} className="text-orange-500" />}
        <span className="text-sm font-medium text-gray-700 group-hover:text-primary">{title}</span>
      </div>
      {completed && <CheckCircle size={16} className="text-green-500" />}
    </div>
  );
};

export default ModuleItem;