import './Calendar.css';

const Calendar = () => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Course Schedule: October 2025</h2>
        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Exam</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Lecture</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Assignment</span>
        </div>
      </div>

      <div className="calendar-grid rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 p-2 text-xs font-bold text-gray-500 text-center uppercase">
            {day}
          </div>
        ))}
        {days.map(day => (
          <div key={day} className="calendar-day p-2 relative hover:bg-gray-50 transition">
            <span className="text-xs font-semibold text-gray-400">{day}</span>
            
            {day === 15 && (
              <div className="calendar-event bg-red-100 text-red-700 p-1 font-bold truncate">Midterm Exam</div>
            )}
            {day === 20 && (
              <div className="calendar-event bg-green-100 text-green-700 p-1 font-bold truncate">Project Due</div>
            )}
            {(day === 2 || day === 9 || day === 16 || day === 23) && (
              <div className="calendar-event bg-blue-50 text-blue-600 p-1 truncate">Lecture</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;