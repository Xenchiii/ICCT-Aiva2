import { MessageSquare } from 'lucide-react';

const THREADS = [
  { id: 1, title: 'Help with Flexbox?', author: 'Josh Abad', replies: 5 },
  { id: 2, title: 'Project Ideas share', author: 'Bea Bautista', replies: 12 },
];

const DiscussionForum = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-gray-800">Class Discussion</h3>
      <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold">New Post</button>
    </div>
    {THREADS.map(t => (
      <div key={t.id} className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center cursor-pointer hover:shadow-sm">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-blue-500" />
          <div>
            <h4 className="font-bold text-gray-800">{t.title}</h4>
            <p className="text-xs text-gray-500">Posted by {t.author}</p>
          </div>
        </div>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded font-bold text-gray-600">{t.replies} replies</span>
      </div>
    ))}
  </div>
);

export default DiscussionForum;