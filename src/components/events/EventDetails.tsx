import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Share2 } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock checking ID (In real app, fetch from API)
  const event = {
    title: 'ICCT Tech Summit 2026',
    date: 'March 15, 2026',
    time: '9:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    description: 'Join us for the biggest tech event of the year! Featuring speakers from top tech companies, hands-on workshops, and a hackathon with cash prizes.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative h-64">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 bg-white/90 p-2 rounded-full hover:bg-white transition"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-black text-gray-900">{event.title}</h1>
          <button className="p-2 text-gray-400 hover:text-primary transition">
            <Share2 size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <Calendar className="text-primary" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Date</p>
              <p className="font-semibold">{event.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <Clock className="text-primary" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Time</p>
              <p className="font-semibold">{event.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <MapPin className="text-primary" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold">Location</p>
              <p className="font-semibold">{event.location}</p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none text-gray-600 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-2">About Event</h3>
          <p>{event.description}</p>
        </div>

        <button 
          onClick={() => navigate(`/events/register/${id}`)}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-900 transition shadow-lg hover:shadow-xl"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventDetails;