import { Link } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';

const EventsPage = () => {
  const events = [
    { id: '1', title: 'CES Tech Summit 2026', date: 'Feb 15', org: 'CES', type: 'Seminar' },
    { id: '2', title: 'Web Arachnids Workshop', date: 'Mar 02', org: 'Sub-Org', type: 'Workshop' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">Upcoming Events</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <Link 
            key={event.id} 
            to={`/dashboard/events/${event.id}`} 
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition group"
          >
            <div className="h-32 bg-primary flex items-center justify-center text-secondary font-black text-4xl">
              {event.date.split(' ')[0]}
            </div>
            <div className="p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 block">{event.type}</span>
              <h3 className="text-xl font-bold text-primary group-hover:text-accent transition">{event.title}</h3>
              <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><MapPin size={14}/> Antipolo Campus</span>
                <span className="flex items-center gap-1"><Users size={14}/> {event.org}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;