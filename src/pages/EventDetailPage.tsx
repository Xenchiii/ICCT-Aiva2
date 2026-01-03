import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, CheckCircle, QrCode } from 'lucide-react';
import { formatDateTime } from '@/utils/dateFormatter';

const EventDetailPage = () => {
  const { id } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);

  // Mock data representing an ICCT campus event
  const event = {
    title: "AI & Future of Computing Seminar",
    organizer: "CES - Computer Explorer Society",
    date: "2026-02-15T13:00:00",
    location: "Audio Visual Room (AVR) - Antipolo Campus",
    description: "Join us for an in-depth session on how AI is shaping the industry. This event features speakers from the industry and a live demo of Aiva's new features.",
    capacity: 100,
    registeredCount: 64
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Event Banner */}
      <div className="h-64 bg-primary rounded-3xl relative overflow-hidden flex items-end p-8">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.icct.edu.ph/wp-content/uploads/2023/bg-pattern.png')]"></div>
        <div className="relative z-10">
          <span className="bg-secondary text-primary px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">
            {event.organizer}
          </span>
          <h1 className="text-4xl font-black text-white">{event.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-primary">About this Event</h3>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-3">
                <Calendar className="text-accent" size={20} />
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Date & Time</p>
                  <p className="text-sm font-medium">{formatDateTime(event.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-accent" size={20} />
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Location</p>
                  <p className="text-sm font-medium">{event.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Registration & QR */}
        <div className="space-y-4">
          {!isRegistered ? (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Available Slots</span>
                <span className="font-bold text-primary">{event.capacity - event.registeredCount}</span>
              </div>
              <button 
                onClick={() => setIsRegistered(true)}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition"
              >
                RSVP Now
              </button>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border-2 border-green-500 shadow-lg text-center space-y-4">
              <CheckCircle className="mx-auto text-green-500" size={48} />
              <h3 className="font-bold text-primary">Registered!</h3>
              <div className="bg-gray-50 p-4 rounded-xl inline-block">
                <QrCode className="text-primary" size={140} />
              </div>
              <p className="text-xs text-gray-400">Present this QR code at the entrance for AI Attendance marking.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;