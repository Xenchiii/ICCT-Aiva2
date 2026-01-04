import { User } from 'lucide-react';

interface ForumPostProps {
  author: string;
  date: string;
  content: string;
  isOp?: boolean; // Is Original Poster
}

const ForumPost: React.FC<ForumPostProps> = ({ author, date, content, isOp }) => {
  return (
    <div className={`p-4 rounded-xl border ${isOp ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isOp ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
          {isOp ? <User size={14} /> : author[0]}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">
            {author} {isOp && <span className="ml-2 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded">AUTHOR</span>}
          </p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
      <div className="text-sm text-gray-700 leading-relaxed pl-11">
        {content}
      </div>
    </div>
  );
};

export default ForumPost;