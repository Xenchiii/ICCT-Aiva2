import React from 'react';
import { useParams } from 'react-router-dom';
import { FileText, MessageCircle, Info } from 'lucide-react';

const CourseDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="bg-primary p-8 rounded-2xl text-white">
        <h1 className="text-3xl font-bold">IT 302: Web Development</h1>
        <p className="opacity-70">Professor Juan Cruz • Room 302</p>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button className="px-4 py-2 border-b-2 border-primary font-bold text-primary">Modules</button>
        <button className="px-4 py-2 text-gray-400">Announcements</button>
        <button className="px-4 py-2 text-gray-400">Forum</button>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-6 bg-white rounded-xl border border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-lg text-primary"><FileText /></div>
              <div><h4 className="font-bold">Week {i}: Introduction to React</h4><p className="text-xs text-gray-400">PDF Document • 2.4 MB</p></div>
            </div>
            <button className="text-primary font-bold text-sm">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetailPage;