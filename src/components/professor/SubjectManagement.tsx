import React from 'react';
import { MoreVertical, Users, Calendar } from 'lucide-react';

const subjects = [
  { id: 'CS101', name: 'Intro to Computing', schedule: 'MWF 10:00 AM', students: 42, term: '1st Sem' },
  { id: 'IT201', name: 'Web Development', schedule: 'TTH 1:00 PM', students: 35, term: '1st Sem' },
  { id: 'CS302', name: 'Data Structures', schedule: 'MWF 8:00 AM', students: 28, term: '1st Sem' },
];

const SubjectManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">My Subjects</h2>
        <button className="bg-primary text-secondary px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
          + Add New Subject
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-accent bg-blue-50 px-2 py-1 rounded mb-2 inline-block">
                  {subject.id}
                </span>
                <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{subject.students} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{subject.schedule}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">View Class List</button>
              <button className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-opacity-90">Manage Grades</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectManagement;