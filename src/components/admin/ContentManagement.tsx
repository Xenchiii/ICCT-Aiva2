import React from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

const ContentManagement = () => {
  const posts = [
    { id: 1, title: 'Welcome to Aiva 2.0', category: 'Announcement', date: 'Jan 2, 2026' },
    { id: 2, title: 'Final Exam Schedule', category: 'Academic', date: 'Dec 28, 2025' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-primary">Content & CMS</h2>
        <button className="bg-secondary text-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {posts.map((post) => (
          <div key={post.id} className="p-4 flex justify-between items-center border-b last:border-0 hover:bg-gray-50">
            <div>
              <h4 className="font-bold text-gray-800">{post.title}</h4>
              <p className="text-xs text-gray-500">{post.category} • Posted on {post.date}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-blue-600"><Edit size={18} /></button>
              <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;