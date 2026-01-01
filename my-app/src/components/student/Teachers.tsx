import { useState } from 'react';
import { GraduationCap, Search, Mail, MessageCircle, Award, Star, BookOpen, Users } from 'lucide-react';

interface Props {
  teachers?: any[];
  darkMode: boolean;
}

export default function Teachers({ teachers: propTeachers, darkMode }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Hardcoded teachers list
  const defaultTeachers = [
    {
      id: 'teacher1',
      teacher_id: 'TCH-001',
      name: 'Sir Joriz D. Chiong',
      email: 'joriz.chiong@school.edu',
      department: 'Computer Science',
      bio: 'Experienced educator specializing in programming and software development.',
      avatar_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%239333ea"/%3E%3Ctext x="50" y="65" font-size="40" fill="white" text-anchor="middle"%3EJC%3C/text%3E%3C/svg%3E',
      course_count: 5,
      student_count: 120
    },
    {
      id: 'teacher2',
      teacher_id: 'TCH-002',
      name: 'Sir Daither Dongcoy',
      email: 'daither.dongcoy@school.edu',
      department: 'Information Technology',
      bio: 'IT specialist with expertise in networking and systems administration.',
      avatar_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%2306b6d4"/%3E%3Ctext x="50" y="65" font-size="40" fill="white" text-anchor="middle"%3EDD%3C/text%3E%3C/svg%3E',
      course_count: 4,
      student_count: 95
    },
    {
      id: 'teacher3',
      teacher_id: 'TCH-003',
      name: 'Miss Jenny Bautista',
      email: 'jenny.bautista@school.edu',
      department: 'Mathematics',
      bio: 'Passionate mathematics teacher dedicated to making complex concepts simple.',
      avatar_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23f59e0b"/%3E%3Ctext x="50" y="65" font-size="40" fill="white" text-anchor="middle"%3EJB%3C/text%3E%3C/svg%3E',
      course_count: 6,
      student_count: 150
    },
    {
      id: 'teacher4',
      teacher_id: 'TCH-004',
      name: 'Miss Ana Francisco',
      email: 'ana.francisco@school.edu',
      department: 'Computer Science',
      bio: 'Web development expert and UI/UX design enthusiast.',
      avatar_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%2310b981"/%3E%3Ctext x="50" y="65" font-size="40" fill="white" text-anchor="middle"%3EAF%3C/text%3E%3C/svg%3E',
      course_count: 4,
      student_count: 110
    },
    {
      id: 'teacher5',
      teacher_id: 'TCH-005',
      name: 'Miss Mara Caratao',
      email: 'mara.caratao@school.edu',
      department: 'Engineering',
      bio: 'Engineering instructor with focus on practical applications and innovation.',
      avatar_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23ec4899"/%3E%3Ctext x="50" y="65" font-size="40" fill="white" text-anchor="middle"%3EMC%3C/text%3E%3C/svg%3E',
      course_count: 3,
      student_count: 85
    },
    {
      id: 'teacher6',
      teacher_id: 'TCH-006',
      name: 'Sir Alexis Glenn Dela Cruz',
      email: 'alexis.delacruz@school.edu',
      department: 'Information Technology',
      bio: 'Database management and data science specialist.',
      avatar_url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23ef4444"/%3E%3Ctext x="50" y="65" font-size="40" fill="white" text-anchor="middle"%3EAD%3C/text%3E%3C/svg%3E',
      course_count: 5,
      student_count: 130
    }
  ];

  // Use prop teachers if provided, otherwise use default
  const teachers = propTeachers && propTeachers.length > 0 ? propTeachers : defaultTeachers;

  const departments = ['All', 'Computer Science', 'Information Technology', 'Engineering', 'Mathematics'];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.department?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const defaultAvatar = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%236366f1"/%3E%3Ctext x="50" y="65" font-size="40" fill="white" text-anchor="middle"%3ET%3C/text%3E%3C/svg%3E';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gradient-to-br from-green-600 to-emerald-600' : 'bg-gradient-to-br from-green-500 to-emerald-500'
      } text-white shadow-lg transform transition-all duration-300 hover:scale-[1.01]`}>
        <div className="flex items-center justify-between">
          <div className="animate-slideInLeft">
            <h2 className="text-2xl font-bold mb-2">Our Teachers</h2>
            <p className="text-green-100">Connect with expert educators and mentors</p>
          </div>
          <GraduationCap className="h-16 w-16 text-green-200 animate-pulse" />
        </div>
      </div>

      {/* Search and Filter */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search teachers by name, email, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'
              } focus:border-green-500 transition-all outline-none`}
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className={`px-4 py-3 rounded-lg border-2 ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'
            } focus:border-green-500 transition-all outline-none`}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Teachers', value: teachers.length, icon: Users, color: 'blue' },
          { label: 'Departments', value: departments.length - 1, icon: BookOpen, color: 'green' },
          { label: 'Average Rating', value: '4.8', icon: Star, color: 'yellow' },
          { label: 'Total Courses', value: teachers.reduce((acc, t) => acc + (t.course_count || 0), 0), icon: Award, color: 'purple' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          const colorMap: any = {
            blue: 'from-blue-500 to-cyan-500',
            green: 'from-green-500 to-emerald-500',
            yellow: 'from-yellow-500 to-orange-500',
            purple: 'from-purple-500 to-pink-500'
          };

          return (
            <div
              key={stat.label}
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slideUp`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorMap[stat.color]} flex items-center justify-center shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Teachers Grid */}
      {filteredTeachers.length === 0 ? (
        <div className={`p-12 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center animate-scaleIn`}>
          <GraduationCap className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <h3 className="text-xl font-semibold mb-2">No Teachers Found</h3>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            {searchQuery || selectedDepartment !== 'All' 
              ? 'Try adjusting your search or filter' 
              : 'Teachers will appear here once they register'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className={`p-6 rounded-xl ${
                darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
              } shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer animate-slideUp`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Teacher Avatar */}
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={teacher.avatar_url || defaultAvatar}
                  alt={teacher.name}
                  className="w-16 h-16 rounded-full ring-4 ring-green-500 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{teacher.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {teacher.department || 'Department'}
                  </p>
                </div>
              </div>

              {/* Bio */}
              {teacher.bio && (
                <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {teacher.bio}
                </p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`p-3 rounded-lg text-center ${darkMode ? 'bg-gray-750' : 'bg-gray-100'}`}>
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <BookOpen className="h-4 w-4 text-green-600" />
                    <span className="text-lg font-bold">{teacher.course_count || 0}</span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Courses</p>
                </div>
                <div className={`p-3 rounded-lg text-center ${darkMode ? 'bg-gray-750' : 'bg-gray-100'}`}>
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-lg font-bold">{teacher.student_count || 0}</span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Students</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
                <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  4.8
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105">
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-medium">Message</span>
                </button>
                <button className={`px-4 py-2.5 rounded-lg border-2 ${
                  darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                } transition-all transform hover:scale-105`}>
                  <Mail className="h-5 w-5" />
                </button>
              </div>

              {/* Teacher ID Badge */}
              {teacher.teacher_id && (
                <div className={`mt-4 p-2 rounded-lg text-center ${
                  darkMode ? 'bg-gray-750' : 'bg-gray-100'
                }`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    ID: {teacher.teacher_id}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Featured Teachers Section */}
      {filteredTeachers.length > 0 && (
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg animate-fadeIn`}>
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Award className="h-6 w-6 mr-2 text-yellow-600" />
            Featured Teachers
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredTeachers.slice(0, 3).map((teacher, index) => (
              <div
                key={teacher.id}
                className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-750' : 'bg-gray-50'
                } hover:shadow-md transition-all transform hover:scale-105 animate-slideUp`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={teacher.avatar_url || defaultAvatar}
                    alt={teacher.name}
                    className="w-12 h-12 rounded-full ring-2 ring-yellow-500"
                  />
                  <div>
                    <p className="font-semibold">{teacher.name}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {teacher.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                    Top Rated
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.5s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.4s ease-out; }
      `}</style>
    </div>
  );
}