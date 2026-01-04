import { Megaphone, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  { id: 1, title: 'No Classes - Public Holiday', date: 'Aug 21', type: 'Holiday' },
  { id: 2, title: 'Midterm Exam Schedule Released', date: 'Aug 18', type: 'Academic' },
  { id: 3, title: 'Library System Maintenance', date: 'Aug 15', type: 'System' },
];

const AnnouncementWidget = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Megaphone size={18} className="text-primary" /> Announcements
        </h3>
        <button className="text-xs font-bold text-primary hover:underline">View All</button>
      </div>
      
      <div className="space-y-3">
        {ANNOUNCEMENTS.map((item) => (
          <div key={item.id} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">{item.type} • {item.date}</p>
              <h4 className="text-sm font-semibold text-gray-800">{item.title}</h4>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementWidget;