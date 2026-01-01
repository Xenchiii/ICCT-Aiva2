import { useState, useEffect } from 'react';
import { Shield, Users, GraduationCap, BookOpen, BarChart3, Settings, Activity, AlertTriangle, Database, Award, FileText, Bell, User, Loader, RefreshCw, Edit, Trash2, Search } from 'lucide-react';

interface Props {
  currentUser: any;
  darkMode: boolean;
  activeTab: string;
  apiEndpoint?: string;
}

export default function AdminDashboard({ currentUser, darkMode, activeTab, apiEndpoint = '/api' }: Props) {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const departments = ['BSIT', 'BSCS', 'CBA', 'ISHTM'];

  const fetchData = async (endpoint: string) => {
    const token = sessionStorage.getItem('auth_token');
    const response = await fetch(`${apiEndpoint}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
    }
    
    return await response.json();
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        switch (activeTab) {
          case 'dashboard':
            const statsData = await fetchData('/admin/stats');
            setStats({
              overview: [
                { label: 'Total Users', value: statsData.totalUsers || 0, icon: Users, color: 'blue', change: '+12%' },
                { label: 'Active Students', value: statsData.totalStudents || 0, icon: GraduationCap, color: 'green', change: '+8%' },
                { label: 'Active Teachers', value: statsData.totalTeachers || 0, icon: Award, color: 'purple', change: '+3%' },
                { label: 'Total Courses', value: statsData.totalCourses || 0, icon: BookOpen, color: 'orange', change: '+15%' }
              ]
            });
            break;

          case 'users':
            const allUsers = await fetchData('/admin/users');
            setUsers(Array.isArray(allUsers) ? allUsers : []);
            break;

          case 'students':
            const studentsData = await fetchData('/teacher/students');
            setStudents(Array.isArray(studentsData) ? studentsData : []);
            break;

          case 'teachers':
            const teachersData = await fetchData('/teachers');
            setTeachers(Array.isArray(teachersData) ? teachersData : []);
            break;

          case 'classes':
            const classesData = await fetchData('/teacher/classes');
            setClasses(Array.isArray(classesData) ? classesData : []);
            break;

          case 'resources':
            const resourcesData = await fetchData('/resources');
            setResources(Array.isArray(resourcesData) ? resourcesData : []);
            break;

          case 'analytics':
            const analyticsData = await fetchData('/admin/stats');
            setAnalytics(analyticsData);
            break;

          case 'reports':
            const reportsData = await fetchData('/admin/reports');
            setReports(Array.isArray(reportsData) ? reportsData : []);
            break;

          case 'system':
            const metricsData = await fetchData('/admin/system-metrics');
            setSystemMetrics(Array.isArray(metricsData) ? metricsData : []);
            break;

          case 'notifications':
            const notifData = await fetchData('/notifications');
            setNotifications(Array.isArray(notifData) ? notifData : []);
            break;
        }
      } catch (err: any) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Only load data for tabs that need it (exclude calendar, profile, settings)
    if (activeTab !== 'calendar' && activeTab !== 'profile' && activeTab !== 'settings') {
      loadData();
    } else {
      setLoading(false);
    }
  }, [activeTab, apiEndpoint]);

  const refreshData = () => {
    window.location.reload();
  };

  const getColorClasses = (color: string) => {
    const colors: any = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      red: 'from-red-500 to-red-600'
    };
    return colors[color] || colors.blue;
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0][0] + parts[parts.length - 1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Loading admin data...</p>
        </div>
      </div>
    );
  }

  if (error && activeTab !== 'calendar' && activeTab !== 'profile' && activeTab !== 'settings') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center max-w-md`}>
          <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Error Loading Data</h3>
          <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{error}</p>
          <button
            onClick={refreshData}
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats?.overview?.map((stat: any, index: number) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${getColorClasses(stat.color)}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    {stat.change && (
                      <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                    )}
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Settings className="h-6 w-6 mr-2 text-red-600" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickActionButton icon={Users} label="Manage Users" color="blue" darkMode={darkMode} />
                <QuickActionButton icon={BookOpen} label="Manage Classes" color="green" darkMode={darkMode} />
                <QuickActionButton icon={Activity} label="View Analytics" color="purple" darkMode={darkMode} />
                <QuickActionButton icon={Settings} label="Settings" color="red" darkMode={darkMode} />
              </div>
            </div>
          </>
        );

      case 'users':
        return (
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold flex items-center">
                <Users className="h-7 w-7 mr-3 text-red-600" />
                User Management
              </h3>
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all">
                + Add User
              </button>
            </div>
            {users.length === 0 ? (
              <EmptyState message="No users found" icon={Users} darkMode={darkMode} />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className={`text-left p-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>User</th>
                      <th className={`text-left p-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Email</th>
                      <th className={`text-left p-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Role</th>
                      <th className={`text-left p-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Status</th>
                      <th className={`text-left p-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: any) => (
                      <tr
                        key={user.id}
                        className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}
                      >
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {getInitials(user.name)}
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className={`p-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'student'
                              ? darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                              : user.role === 'teacher'
                              ? darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                              : darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.is_active
                              ? darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                              : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case 'students':
        const filteredStudents = students.filter(student => 
          student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.student_no?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold flex items-center">
                  <GraduationCap className="h-7 w-7 mr-3 text-red-600" />
                  Student Management
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-500">
                    Total: {students.length} students
                  </div>
                  <button
                    onClick={refreshData}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students by name, email, or student number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'
                  } focus:border-red-500 transition-all outline-none`}
                />
              </div>

              {filteredStudents.length === 0 ? (
                <EmptyState message="No students found" icon={GraduationCap} darkMode={darkMode} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredStudents.map((student: any) => (
                    <div key={student.id} className={`p-5 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'} hover:shadow-lg transition-all`}>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {getInitials(student.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{student.name}</h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                            {student.student_no || student.email}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Level:</span>
                          <span className="font-semibold">{student.level || 1}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Points:</span>
                          <span className="font-semibold">{student.points || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Course:</span>
                          <span className="font-semibold text-xs">{student.course || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'teachers':
        const filteredTeachers = teachers.filter(teacher => 
          teacher.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.department?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold flex items-center">
                  <Award className="h-7 w-7 mr-3 text-red-600" />
                  Teacher Management
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-500">
                    Total: {teachers.length} teachers
                  </div>
                  <button
                    onClick={refreshData}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all">
                    + Add Teacher
                  </button>
                </div>
              </div>

              <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search teachers by name, email, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'
                  } focus:border-red-500 transition-all outline-none`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Teachers</p>
                  <p className="text-2xl font-bold">{teachers.length}</p>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Courses</p>
                  <p className="text-2xl font-bold">{teachers.reduce((acc, t) => acc + (t.course_count || 0), 0)}</p>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Students</p>
                  <p className="text-2xl font-bold">{teachers.reduce((acc, t) => acc + (t.student_count || 0), 0)}</p>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Departments</p>
                  <p className="text-2xl font-bold">
                    {new Set(teachers.map(t => t.department).filter(Boolean)).size}
                  </p>
                </div>
              </div>

              {filteredTeachers.length === 0 ? (
                <EmptyState message="No teachers found" icon={Award} darkMode={darkMode} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTeachers.map((teacher: any) => (
                    <div 
                      key={teacher.id} 
                      className={`p-6 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'} hover:shadow-lg transition-all`}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {getInitials(teacher.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-lg truncate">{teacher.name}</h4>
                          <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {teacher.email}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Department:</span>
                          <span className="font-semibold text-xs">{teacher.department || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Courses:</span>
                          <span className="font-semibold">{teacher.course_count || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Students:</span>
                          <span className="font-semibold">{teacher.student_count || 0}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        <button className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors flex items-center justify-center space-x-1">
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'resources':
        const filteredResources = selectedDepartment === 'all' 
          ? resources 
          : resources.filter(r => r.department === selectedDepartment);

        return (
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold flex items-center">
                <BookOpen className="h-7 w-7 mr-3 text-red-600" />
                Resource Library
              </h3>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                + Upload Resource
              </button>
            </div>

            <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedDepartment('all')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  selectedDepartment === 'all'
                    ? 'bg-red-600 text-white shadow-lg'
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                    selectedDepartment === dept
                      ? 'bg-red-600 text-white shadow-lg'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total</p>
                <p className="text-2xl font-bold">{resources.length}</p>
              </div>
              {departments.map(dept => (
                <div key={dept} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{dept}</p>
                  <p className="text-2xl font-bold">
                    {resources.filter(r => r.department === dept).length}
                  </p>
                </div>
              ))}
            </div>

            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">
                  {selectedDepartment === 'all' 
                    ? 'No resources uploaded yet' 
                    : `No resources for ${selectedDepartment}`}
                </p>
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Upload Your First Resource
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredResources.map((resource: any) => (
                  <div key={resource.id} className={`p-5 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'} hover:shadow-lg transition-all`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        resource.type === 'pdf' ? 'bg-red-100' : 
                        resource.type === 'video' ? 'bg-purple-100' : 
                        'bg-blue-100'
                      }`}>
                        <FileText className={`h-6 w-6 ${
                          resource.type === 'pdf' ? 'text-red-600' : 
                          resource.type === 'video' ? 'text-purple-600' : 
                          'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{resource.title}</h4>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {resource.subject}
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                      }`}>
                        {resource.department || 'General'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs transition-colors">
                        View
                      </button>
                      <button className="flex-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showUploadModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden`}>
                  <div className="p-6 bg-gradient-to-br from-red-600 to-rose-600 text-white">
                    <h3 className="text-2xl font-bold">Upload Resource</h3>
                    <p className="text-red-100 mt-1">Add learning materials for students</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Resource Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Introduction to Programming"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-750 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Department
                      </label>
                      <select className={`w-full px-4 py-2 rounded-lg border ${
                        darkMode ? 'bg-gray-750 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
                      }`}>
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        File URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-750 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
                        }`}
                      />
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={() => setShowUploadModal(false)}
                        className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                          darkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setShowUploadModal(false)}
                        className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className="text-2xl font-semibold flex items-center mb-6">
                <BarChart3 className="h-7 w-7 mr-3 text-red-600" />
                Platform Analytics
              </h3>
              {analytics ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Users</p>
                      <p className="text-2xl font-bold">{analytics.totalUsers || 0}</p>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Active Students</p>
                      <p className="text-2xl font-bold">{analytics.totalStudents || 0}</p>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Active Teachers</p>
                      <p className="text-2xl font-bold">{analytics.totalTeachers || 0}</p>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Courses</p>
                      <p className="text-2xl font-bold">{analytics.totalCourses || 0}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Engagement Rate</p>
                      <p className="text-2xl font-bold">85%</p>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Completion Rate</p>
                      <p className="text-2xl font-bold">92%</p>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Avg Session Time</p>
                      <p className="text-2xl font-bold">45min</p>
                    </div>
                  </div>
                </>
              ) : (
                <EmptyState message="No analytics data available" icon={BarChart3} darkMode={darkMode} />
              )}
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold flex items-center">
                <FileText className="h-7 w-7 mr-3 text-red-600" />
                Generated Reports
              </h3>
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all">
                + Generate Report
              </button>
            </div>
            {reports.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No reports generated yet</p>
                <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all">
                  Generate Your First Report
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report: any) => (
                  <div key={report.id} className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-750 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{report.title}</h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'system':
        return (
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className="text-2xl font-semibold flex items-center mb-6">
              <Database className="h-7 w-7 mr-3 text-red-600" />
              System Health Monitor
            </h3>
            {systemMetrics.length === 0 ? (
              <EmptyState message="No system metrics available" icon={Database} darkMode={darkMode} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {systemMetrics.map((metric: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-6 rounded-lg ${
                      darkMode ? 'bg-gray-750' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        metric.status === 'healthy' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <Database className={`h-6 w-6 ${
                          metric.status === 'healthy' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      </div>
                      <div>
                        <p className={`text-base font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          {metric.label}
                        </p>
                        <p className="text-sm text-gray-500">
                          Status: <span className={`font-semibold ${
                            metric.status === 'healthy' ? 'text-green-600' : 'text-red-600'
                          }`}>{metric.status}</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'notifications':
        return (
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold flex items-center">
                <Bell className="h-7 w-7 mr-3 text-red-600" />
                Notification Center
              </h3>
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all">
                + New Notification
              </button>
            </div>
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No notifications yet</p>
                <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all">
                  Send Your First Notification
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notif: any) => (
                  <div key={notif.id} className={`flex items-start space-x-4 p-4 rounded-lg ${darkMode ? 'bg-gray-750 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{notif.title}</h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{notif.message}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {new Date(notif.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'settings':
        return (
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className="text-2xl font-semibold flex items-center mb-6">
              <Settings className="h-7 w-7 mr-3 text-red-600" />
              Platform Settings
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">General Settings</h4>
                <div className="space-y-3">
                  <SettingItem label="Platform Name" value="ICCTutor Link" darkMode={darkMode} />
                  <SettingItem label="Support Email" value="support@icctutorlink.ph" darkMode={darkMode} />
                  <SettingItem label="Max Upload Size" value="50 MB" darkMode={darkMode} />
                  <SettingItem label="Session Timeout" value="30 minutes" darkMode={darkMode} />
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Security Settings</h4>
                <div className="space-y-3">
                  <ToggleSetting label="Two-Factor Authentication" enabled={true} darkMode={darkMode} />
                  <ToggleSetting label="IP Whitelist" enabled={false} darkMode={darkMode} />
                  <ToggleSetting label="Auto Logout" enabled={true} darkMode={darkMode} />
                  <ToggleSetting label="Login Alerts" enabled={true} darkMode={darkMode} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className="text-2xl font-semibold flex items-center mb-6">
              <User className="h-7 w-7 mr-3 text-red-600" />
              Admin Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                    {getInitials(currentUser?.name || 'Administrator')}
                  </div>
                  <h4 className="text-xl font-semibold mb-1">{currentUser?.name || 'Administrator'}</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>System Administrator</p>
                  <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:shadow-lg transition-all">
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <ProfileField label="Full Name" value={currentUser?.name || 'Administrator'} darkMode={darkMode} />
                  <ProfileField label="Email" value={currentUser?.email || 'admin@icctutorlink.ph'} darkMode={darkMode} />
                  <ProfileField label="Role" value="System Administrator" darkMode={darkMode} />
                  <ProfileField label="Last Login" value={new Date().toLocaleString()} darkMode={darkMode} />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gradient-to-br from-red-600 to-rose-600' : 'bg-gradient-to-br from-red-500 to-rose-500'
      } text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {activeTab === 'dashboard' && 'Admin Dashboard'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'students' && 'Student Management'}
              {activeTab === 'teachers' && 'Teacher Management'}
              {activeTab === 'classes' && 'Course Management'}
              {activeTab === 'resources' && 'Resource Library'}
              {activeTab === 'analytics' && 'Platform Analytics'}
              {activeTab === 'reports' && 'Reports'}
              {activeTab === 'system' && 'System Monitor'}
              {activeTab === 'notifications' && 'Notifications'}
              {activeTab === 'settings' && 'Settings'}
              {activeTab === 'profile' && 'Profile'}
            </h2>
            <p className="text-red-100">Welcome back, {currentUser?.name || 'Administrator'}!</p>
          </div>
          <div className="flex items-center space-x-3">
            {activeTab !== 'calendar' && activeTab !== 'profile' && activeTab !== 'settings' && (
              <button
                onClick={refreshData}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all"
                title="Refresh Data"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            )}
            <Shield className="h-20 w-20 text-red-200" />
          </div>
        </div>
      </div>

      {renderContent()}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
      `}</style>
    </div>
  );
}

function EmptyState({ message, icon: Icon, darkMode }: { message: string, icon: any, darkMode: boolean }) {
  return (
    <div className="text-center py-16">
      <Icon className={`h-20 w-20 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
      <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{message}</p>
    </div>
  );
}

function QuickActionButton({ icon: Icon, label, color, darkMode: _darkMode }: any) {
  const colorMap: any = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600'
  };

  return (
    <button className={`p-4 rounded-xl bg-gradient-to-br ${colorMap[color]} text-white hover:shadow-lg transition-all transform hover:scale-105`}>
      <Icon className="h-8 w-8 mx-auto mb-2" />
      <p className="text-sm font-semibold">{label}</p>
    </button>
  );
}

function SettingItem({ label, value, darkMode }: any) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{label}</span>
      <input 
        type="text" 
        value={value} 
        className={`px-3 py-1 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
        readOnly
      />
    </div>
  );
}

function ToggleSetting({ label, enabled, darkMode }: any) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{label}</span>
      <button className={`px-4 py-1 rounded-full text-sm font-medium ${
        enabled 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-200 text-gray-600'
      }`}>
        {enabled ? 'Enabled' : 'Disabled'}
      </button>
    </div>
  );
}

function ProfileField({ label, value, darkMode }: { label: string; value: string; darkMode: boolean }) {
  return (
    <div>
      <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
      <input 
        type="text" 
        value={value} 
        className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-750 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
        readOnly
      />
    </div>
  );
}