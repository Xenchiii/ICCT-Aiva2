import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';

interface EventProps {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
}

const EventCard: React.FC<EventProps> = ({ id, title, date, location, attendees, image }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="event-card bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer"
      onClick={() => navigate(`/events/${id}`)}
    >
      <img src={image} alt={title} className="event-card-image" />
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-primary" />
            <span>{attendees} Registered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;