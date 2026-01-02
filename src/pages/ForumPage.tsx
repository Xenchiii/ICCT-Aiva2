import React from 'react';
import { MessageCircle, ThumbsUp, ChevronRight } from 'lucide-react';

const ForumPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Forum Discussions</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold">Start Topic</button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 border-b last:border-0 border-gray-100 hover:bg-gray-50 transition cursor-pointer flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">HOMEWORK HELP</span>
              <h4 className="font-bold text-gray-800">Best practices for React Context API?</h4>
              <p className="text-xs text-gray-400">Posted by Student_15 • 2 hours ago</p>
            </div>
            <div className="flex items-center gap-6 text-gray-400">
              <div className="text-center">
                <p className="text-sm font-bold text-primary">12</p>
                <p className="text-[10px] uppercase">Replies</p>
              </div>
              <ChevronRight size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;