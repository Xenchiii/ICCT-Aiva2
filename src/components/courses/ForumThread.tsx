import ForumPost from './ForumPost';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForumThread = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6"
      >
        <ArrowLeft size={16} /> Back to Discussions
      </button>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Help understanding CSS Flexbox?</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Question</span>
          <span>• Posted by Josh Abad • 2 days ago</span>
        </div>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          I'm struggling with `justify-content` vs `align-items`. Can someone explain the difference in simple terms? I keep getting them mixed up when switching flex-direction.
        </p>

        <div className="border-t border-gray-100 pt-4 flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary">
            <MessageSquare size={16} /> Reply
          </button>
        </div>
      </div>

      <h3 className="font-bold text-gray-800 mb-4">3 Replies</h3>
      <div className="space-y-4">
        <ForumPost 
          author="Bea Bautista" 
          date="1 day ago" 
          content="Think of justify-content as moving things along the MAIN axis (left/right usually), and align-items as the CROSS axis (up/down)." 
        />
        <ForumPost 
          author="Prof. Cruz" 
          date="5 hours ago" 
          content="Great explanation Bea! Also remember that if you do flex-direction: column, the axes flip." 
        />
      </div>
    </div>
  );
};

export default ForumThread;