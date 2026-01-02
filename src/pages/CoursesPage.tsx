import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, Clock } from 'lucide-react';

const CoursesPage = () => {
  // Mock data representing the BSIT/BSCS subjects
  const enrolledSubjects = [
    { id: '1', code: 'IT 302', title: 'Web Development', prof: 'Prof. Cruz', room: 'Lab 4' },
    { id: '2', code: 'CS 201', title: 'Data Structures', prof: 'Prof. Reyes', room: 'Room 302' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {enrolledSubjects.map((sub) => (
        <Link key={sub.id} to={`/dashboard/courses/${sub.id}`} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary group-hover:text-white transition">
              <Book size={24} />
            </div>
            <span className="text-xs font-bold text-gray-400">{sub.code}</span>
          </div>
          <h3 className="text-lg font-bold text-primary mb-1">{sub.title}</h3>
          <p className="text-sm text-gray-500 mb-4">{sub.prof}</p>
          <div className="flex items-center gap-4 text-xs text-gray-400 border-t pt-4">
            <span className="flex items-center gap-1"><Users size={14}/> 42 Students</span>
            <span className="flex items-center gap-1"><Clock size={14}/> {sub.room}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CoursesPage;