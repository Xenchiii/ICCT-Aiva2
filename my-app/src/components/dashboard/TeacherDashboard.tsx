import { GraduationCap, Users, Video, BookOpen, Library, TrendingUp } from 'lucide-react';

interface Props {
  currentUser: any;
  students: any[];
  classes: any[];
  assignments: any[];
  resources: any[];
  darkMode: boolean;
}

export default function TeacherDashboard({
  currentUser,
  students,
  classes,
  assignments,
  resources,
  darkMode
}: Props) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-br from-green-600 to-emerald-600' : 'bg-gradient-to-br from-green-500 to-emerald-500'} text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome, {currentUser?.name?.split(' ')[0] || 'Teacher'}! 👨‍🏫</h2>
            <p className="text-green-100">{currentUser?.department || 'Teacher Dashboard'}</p>
          </div>
          <GraduationCap className="h-16 w-16 text-green-200" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Students" value={students.length} icon={Users} color="blue" darkMode={darkMode} />
        <StatCard label="Active Classes" value={classes.length} icon={Video} color="green" darkMode={darkMode} />
        <StatCard label="Assignments" value={assignments.length} icon={BookOpen} color="purple" darkMode={darkMode} />
        <StatCard label="Resources" value={resources.length} icon={Library} color="orange" darkMode={darkMode} />
      </div>

      {/* Quick Actions */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionButton icon={Video} label="Create New Class" description="Add a class to your schedule" color="green" darkMode={darkMode} />
          <QuickActionButton icon={BookOpen} label="Create Assignment" description="Assign work to students" color="purple" darkMode={darkMode} />
          <QuickActionButton icon={Library} label="Upload Resource" description="Share study materials" color="blue" darkMode={darkMode} />
        </div>
      </div>

      {/* Recent Students & Assignments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentStudents students={students} darkMode={darkMode} />
        <UpcomingAssignments assignments={assignments} darkMode={darkMode} />
      </div>

      {/* Get Started Guide */}
      {students.length === 0 && classes.length === 0 && (
        <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">🚀 Welcome to Your Teaching Dashboard!</h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Get started by creating your first class and adding students</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SetupStep number="1" title="Create Classes" description="Navigate to Classes tab to create your teaching schedule" icon="📚" darkMode={darkMode} />
              <SetupStep number="2" title="Add Students" description="Students will appear here once they enroll in your classes" icon="👥" darkMode={darkMode} />
              <SetupStep number="3" title="Create Content" description="Upload resources and create assignments for your students" icon="📝" darkMode={darkMode} />
            </div>
          </div>
        </div>
      )}

      {/* Platform Overview */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
          Platform Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard title="Students Management" description="View and manage your enrolled students, track their progress" icon="👥" darkMode={darkMode} />
          <FeatureCard title="Classes & Schedule" description="Create and organize your teaching schedule and class sessions" icon="📅" darkMode={darkMode} />
          <FeatureCard title="Analytics Dashboard" description="Track student performance, attendance, and engagement metrics" icon="📊" darkMode={darkMode} />
          <FeatureCard title="Resource Library" description="Upload and share study materials with your students" icon="📚" darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, darkMode }: any) {
  const colorMap: any = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600'
  };

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <Icon className={`h-10 w-10 ${colorMap[color]}`} />
      </div>
    </div>
  );
}

function QuickActionButton({ icon: Icon, label, description, color, darkMode }: any) {
  const colorMap: any = {
    green: darkMode ? 'from-green-600 to-emerald-600' : 'from-green-500 to-emerald-500',
    purple: darkMode ? 'from-purple-600 to-pink-600' : 'from-purple-500 to-pink-500',
    blue: darkMode ? 'from-blue-600 to-cyan-600' : 'from-blue-500 to-cyan-500'
  };

  return (
    <button className={`p-6 rounded-xl bg-gradient-to-br ${colorMap[color]} text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left`}>
      <Icon className="h-8 w-8 mb-3" />
      <h4 className="font-bold text-lg mb-1">{label}</h4>
      <p className="text-sm text-white/90">{description}</p>
    </button>
  );
}

function RecentStudents({ students, darkMode }: any) {
  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Users className="h-6 w-6 mr-2 text-blue-600" />
        Recent Students
      </h3>

      {students.length === 0 ? (
        <div className="text-center py-8">
          <Users className={`h-12 w-12 mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No students enrolled yet</p>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Students will appear here once they enroll in your classes</p>
        </div>
      ) : (
        <div className="space-y-3">
          {students.slice(0, 5).map((student: any) => (
            <div key={student.id} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">{student.name?.charAt(0) || 'S'}</div>
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{student.course}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{student.student_no}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UpcomingAssignments({ assignments, darkMode }: any) {
  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h3 className="text-xl font-semibold mb-4">Upcoming Assignments</h3>
      {(!assignments || assignments.length === 0) ? (
        <div className="text-center py-8">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No upcoming assignments</p>
        </div>
      ) : (
        <div className="space-y-3">
          {assignments.map((a: any) => (
            <div key={a.id} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}>
              <div>
                <p className="font-medium">{a.title}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{a.dueDate}</p>
              </div>
              <div className="text-sm text-gray-500">{a.submissions ? `${a.submissions} submitted` : '0 submitted'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SetupStep({ number, title, description, icon, darkMode }: any) {
  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md text-left`}>
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-bold text-lg">{number}. {title}</h4>
      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
}

function FeatureCard({ title, description, icon, darkMode }: any) {
  return (
    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
}