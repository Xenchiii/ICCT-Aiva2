import { useState } from 'react';
import { Users, Search } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  student_no: string;
  course: string;
  progress: number;
  gpa?: number;
  attendance?: number;
}

interface Props {
  students: Student[];
  darkMode: boolean;
  setActiveTab: (tab: string) => void;
  setSelectedChat?: (student: Student) => void;
}

export default function TeacherStudents({ 
  students, 
  darkMode, 
  setActiveTab,
  setSelectedChat 
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.student_no?.includes(searchQuery) ||
    student.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMessageStudent = (student: Student) => {
    if (setSelectedChat) {
      setSelectedChat(student);
    }
    setActiveTab('messages');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center">
            <Users className="h-6 w-6 mr-2 text-blue-600" />
            My Students
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <Search className="h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search students..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className={`bg-transparent outline-none ${darkMode ? 'text-white' : 'text-gray-900'}`} 
              />
            </div>
          </div>
        </div>

        {students.length === 0 ? (
          <div className="text-center py-12">
            <Users className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className="text-xl font-semibold mb-2">No Students Yet</h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Students will appear here once they enroll in your classes
            </p>
          </div>
        ) : (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Average Progress</p>
                <p className="text-2xl font-bold">
                  {students.length > 0 
                    ? Math.round(students.reduce((acc, s) => acc + (s.progress || 0), 0) / students.length)
                    : 0}%
                </p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Average GPA</p>
                <p className="text-2xl font-bold">
                  {students.length > 0 
                    ? (students.reduce((acc, s) => acc + (s.gpa || 0), 0) / students.length).toFixed(2)
                    : '0.00'}
                </p>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left p-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>
                      Student
                    </th>
                    <th className={`text-left p-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>
                      Student No.
                    </th>
                    <th className={`text-left p-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>
                      Course
                    </th>
                    <th className={`text-left p-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>
                      Progress
                    </th>
                    <th className={`text-left p-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>
                      GPA
                    </th>
                    <th className={`text-left p-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr 
                      key={student.id} 
                      className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} hover:${darkMode ? 'bg-gray-750' : 'bg-gray-50'} transition-colors`}
                    >
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {student.name?.charAt(0) || 'S'}
                          </div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`font-mono text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {student.student_no}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {student.course}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                            <div 
                              className={`h-2 rounded-full ${
                                (student.progress || 0) >= 80 ? 'bg-green-600' :
                                (student.progress || 0) >= 50 ? 'bg-yellow-600' :
                                'bg-red-600'
                              }`}
                              style={{ width: `${student.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${
                            (student.progress || 0) >= 80 ? 'text-green-600' :
                            (student.progress || 0) >= 50 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {student.progress || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold">
                          {student.gpa?.toFixed(2) || 'N/A'}
                        </span>
                      </td>
                      <td className="p-3">
                        <button 
                          onClick={() => handleMessageStudent(student)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition-colors"
                        >
                          Message
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  No students found matching "{searchQuery}"
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}