import EventCard from './EventCard';

// HARDCODED MOCK DATA
const EVENTS = [
  {
    id: '1',
    title: 'ICCT Tech Summit 2026',
    date: 'March 15, 2026 • 9:00 AM',
    location: 'Main Auditorium',
    attendees: 342,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '2',
    title: 'Inter-Department Basketball',
    date: 'March 20, 2026 • 2:00 PM',
    location: 'ICCT Gymnasium',
    attendees: 120,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ee2?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '3',
    title: 'Cybersecurity Workshop',
    date: 'March 25, 2026 • 1:00 PM',
    location: 'Computer Lab 3',
    attendees: 55,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80'
  }
];

const EventCalendar = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Upcoming Campus Events</h2>
        <button className="text-primary text-sm font-bold hover:underline">View All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EVENTS.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;