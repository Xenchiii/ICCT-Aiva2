import { Calendar as CalendarIcon } from 'lucide-react';

const CalendarWidget = () => {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dayNumber = today.getDate();
  const monthName = today.toLocaleDateString('en-US', { month: 'long' });

  return (
    <div className="bg-gradient-to-br from-primary to-blue-900 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
      <div>
        <p className="text-blue-200 font-bold uppercase text-xs tracking-widest">{monthName} {today.getFullYear()}</p>
        <h2 className="text-4xl font-black mt-1">{dayNumber}</h2>
        <p className="text-lg font-medium">{dayName}</p>
      </div>
      <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
        <CalendarIcon size={32} />
      </div>
    </div>
  );
};

export default CalendarWidget;