import { MessageSquare } from 'lucide-react';
import SLAIndicator from './SLAIndicator';

const InquiryCard = ({ inquiry }: any) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 hover:border-primary transition shadow-sm group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded uppercase">
          {inquiry.category}
        </span>
        <SLAIndicator createdAt={inquiry.createdAt} category={inquiry.category} />
      </div>
      
      <h4 className="font-bold text-gray-800 group-hover:text-primary transition">{inquiry.subject}</h4>
      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{inquiry.description}</p>
      
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden">
            <img src={`https://ui-avatars.com/api/?name=${inquiry.studentName}`} alt="Student" />
          </div>
          <span className="text-xs font-medium text-gray-600">{inquiry.studentName}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-xs font-bold">
          <MessageSquare size={14} /> {inquiry.repliesCount || 0}
        </div>
      </div>
    </div>
  );
};

export default InquiryCard;