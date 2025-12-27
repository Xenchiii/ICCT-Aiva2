import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, User, X } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  location?: string;
  teacher?: string;
  type: 'class' | 'exam' | 'assignment' | 'event';
  color: string;
}

interface Props {
  darkMode: boolean;
  isAdmin?: boolean;
  currentUser?: any;
}

export default function Calendar({ darkMode }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [_showEventModal, _setShowEventModal] = useState(false);
  const [events] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Mathematics Exam',
      date: new Date(2025, 9, 20),
      time: '9:00 AM',
      location: 'Room 301',
      teacher: 'Prof. Santos',
      type: 'exam',
      color: 'red'
    },
    {
      id: '2',
      title: 'Physics Lab',
      date: new Date(2025, 9, 18),
      time: '11:00 AM',
      location: 'Lab 2',
      teacher: 'Prof. Cruz',
      type: 'class',
      color: 'blue'
    },
    {
      id: '3',
      title: 'Programming Assignment Due',
      date: new Date(2025, 9, 22),
      time: '11:59 PM',
      type: 'assignment',
      color: 'purple'
    },
    {
      id: '4',
      title: 'Science Fair',
      date: new Date(2025, 9, 25),
      time: '2:00 PM',
      location: 'Main Hall',
      type: 'event',
      color: 'green'
    }
  ]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const getEventsForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return events.filter((event: CalendarEvent) => isSameDate(event.date, date));
  };

  const handleDayClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
  };

  const selectedDateEvents = selectedDate ? events.filter((event: CalendarEvent) => isSameDate(event.date, selectedDate)) : [];

  const typeColors: any = {
    class: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500' },
    exam: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500' },
    assignment: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-500' },
    event: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500' }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {events.length} events this month
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={previousMonth}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              } transition-colors`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className={`px-4 py-2 rounded-lg ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              } transition-colors`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {daysOfWeek.map(day => (
            <div
              key={day}
              className={`text-center font-semibold py-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {day}
            </div>
          ))}

          {/* Empty cells before first day */}
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dayEvents = getEventsForDay(day);
            const today = isToday(day);

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`aspect-square p-2 rounded-lg transition-all duration-200 ${
                  today
                    ? darkMode
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-blue-500 text-white font-bold'
                    : darkMode
                    ? 'bg-gray-750 hover:bg-gray-700'
                    : 'bg-gray-50 hover:bg-gray-100'
                } ${
                  selectedDate && isSameDate(selectedDate, new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                    ? 'ring-2 ring-blue-500'
                    : ''
                }`}
              >
                <div className="flex flex-col h-full">
                  <span className="text-sm">{day}</span>
                  {dayEvents.length > 0 && (
                    <div className="flex-1 flex flex-col justify-end space-y-1 mt-1">
                      {dayEvents.slice(0, 2).map((event: CalendarEvent) => (
                        <div
                          key={event.id}
                          className={`w-full h-1 rounded-full ${
                            event.type === 'exam' ? 'bg-red-500' :
                            event.type === 'class' ? 'bg-blue-500' :
                            event.type === 'assignment' ? 'bg-purple-500' :
                            'bg-green-500'
                          }`}
                        />
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-xs">+{dayEvents.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Event Details Sidebar */}
      {selectedDate && (
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <button
              onClick={() => setSelectedDate(null)}
              className={`p-2 rounded-lg ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } transition-colors`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {selectedDateEvents.length === 0 ? (
            <div className="text-center py-8">
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                No events scheduled for this day
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedDateEvents.map((event: CalendarEvent) => {
                const colors = typeColors[event.type];
                return (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border-l-4 ${colors.border} ${
                      darkMode ? 'bg-gray-750' : colors.bg
                    } transition-all duration-200 hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{event.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${colors.bg} ${colors.text} font-medium uppercase`}>
                        {event.type}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className={`h-4 w-4 ${colors.text}`} />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {event.time}
                        </span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className={`h-4 w-4 ${colors.text}`} />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {event.location}
                          </span>
                        </div>
                      )}
                      
                      {event.teacher && (
                        <div className="flex items-center space-x-2 text-sm">
                          <User className={`h-4 w-4 ${colors.text}`} />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {event.teacher}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Upcoming Events */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events
            .filter((event: CalendarEvent) => event.date >= new Date())
            .sort((a: CalendarEvent, b: CalendarEvent) => a.date.getTime() - b.date.getTime())
            .slice(0, 5)
            .map((event: CalendarEvent) => {
              const colors = typeColors[event.type];
              return (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-750' : 'bg-gray-50'
                  } transition-all duration-200 hover:shadow-md`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className={`text-xs px-2 py-1 rounded ${colors.bg} ${colors.text} font-medium uppercase`}>
                          {event.type}
                        </span>
                        <h4 className="font-medium">{event.title}</h4>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                          {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                          {event.time}
                        </span>
                        {event.location && (
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}