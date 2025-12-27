import { useState, useEffect } from 'react';
import { Video, Plus, Users, Calendar, Clock, Edit, Trash2, Search } from 'lucide-react';

interface Class {
  id: string;
  title: string;
  subject: string;
  code: string;
  schedule: string;
  description?: string;
  student_count?: number;
  room?: string;
}

interface Props {
  classes: Class[];
  setClasses: (classes: Class[]) => void;
  darkMode: boolean;
}

export default function TeacherClasses({ classes, setClasses, darkMode }: Props) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  // reference setter and selectedClass to avoid unused-variable under strict TS rules
  useEffect(() => { void setSelectedClass; void selectedClass; }, [setSelectedClass, selectedClass]);
  const [form, setForm] = useState({
    title: '',
    subject: '',
    schedule: '',
    description: '',
    room: ''
  });

  const filteredClasses = classes.filter(c =>
    c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateClass = () => {
    if (!form.title || !form.subject || !form.schedule) {
      alert('Please fill in all required fields');
      return;
    }

    const newClass: Class = {
      id: Date.now().toString(),
      title: form.title,
      subject: form.subject,
      code: `${form.subject.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      schedule: form.schedule,
      description: form.description,
      room: form.room,
      student_count: 0
    };

    setClasses([...classes, newClass]);
    setForm({ title: '', subject: '', schedule: '', description: '', room: '' });
    setShowCreateModal(false);
  };

  const handleDeleteClass = (classId: string) => {
    if (confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(c => c.id !== classId));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gradient-to-br from-green-600 to-emerald-600' : 'bg-gradient-to-br from-green-500 to-emerald-500'
      } text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">My Classes</h2>
            <p className="text-green-100">Manage your teaching schedule and classes</p>
          </div>
          <Video className="h-16 w-16 text-green-200" />
        </div>
      </div>

      {/* Actions Bar */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center">
            <Video className="h-6 w-6 mr-2 text-green-600" />
            Active Classes ({classes.length})
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <Search className="h-4 w-4" />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`bg-transparent outline-none ${darkMode ? 'text-white' : 'text-gray-900'}`}
              />
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Class</span>
            </button>
          </div>
        </div>

        {/* Classes Grid */}
        {classes.length === 0 ? (
          <div className="text-center py-12">
            <Video className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className="text-xl font-semibold mb-2">No Classes Yet</h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Create your first class to get started
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Create Class
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClasses.map((classItem) => (
              <div
                key={classItem.id}
                className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg ${
                  darkMode
                    ? 'bg-gray-750 border-gray-700 hover:border-green-600'
                    : 'bg-white border-gray-200 hover:border-green-500'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{classItem.title}</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {classItem.subject}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-mono ${
                    darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                  }`}>
                    {classItem.code}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <Clock className={`h-4 w-4 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {classItem.schedule}
                    </span>
                  </div>
                  {classItem.room && (
                    <div className="flex items-center text-sm">
                      <Calendar className={`h-4 w-4 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        Room {classItem.room}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Users className={`h-4 w-4 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {classItem.student_count || 0} students enrolled
                    </span>
                  </div>
                </div>

                {classItem.description && (
                  <p className={`text-sm mb-4 line-clamp-2 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {classItem.description}
                  </p>
                )}

                <div className="flex items-center space-x-2 pt-3 border-t border-gray-700">
                  <button
                    onClick={() => setSelectedClass(classItem)}
                    className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                      darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteClass(classItem.id)}
                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredClasses.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              No classes found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-md rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Create New Class</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <Plus className="h-5 w-5 rotate-45" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Class Title *
                </label>
                <input
                  className={`w-full p-3 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., Programming Fundamentals"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subject *
                </label>
                <input
                  className={`w-full p-3 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., Computer Science"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Schedule *
                </label>
                <input
                  className={`w-full p-3 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., MWF 9:00-10:30 AM"
                  value={form.schedule}
                  onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Room
                </label>
                <input
                  className={`w-full p-3 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  placeholder="e.g., CL-201"
                  value={form.room}
                  onChange={(e) => setForm({ ...form, room: e.target.value })}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Description
                </label>
                <textarea
                  className={`w-full p-3 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Class description..."
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`px-4 py-2 rounded-lg border ${
                    darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateClass}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  Create Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}