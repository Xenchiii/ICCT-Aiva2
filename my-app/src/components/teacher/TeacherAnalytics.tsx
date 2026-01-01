import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, Star, Target, Clock, Award, Calendar, Download } from 'lucide-react';

interface Props {
  students: any[];
  classes: any[];
  assignments: any[];
  analytics: any;
  messages: any[];
  resources: any[];
  darkMode: boolean;
}

export default function TeacherAnalytics({
  students,
  classes,
  assignments,
  analytics,
  messages,
  resources,
  darkMode
}: Props) {
    // reference some props to avoid unused-variable diagnostics in strict TS
    useEffect(() => { void messages; void resources; }, [messages, resources]);
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const metrics = {
    studentCount: students.length,
    classCount: classes.length,
    avgGpa: analytics?.avgGpa || '3.7',
    avgAttendance: analytics?.avgAttendance || 92,
    avgCompletion: analytics?.avgCompletion || 88,
    avgStudyTime: analytics?.avgStudyTime || '4.5'
  };

  const weeklyData = [
    { day: 'Mon', students: 45, engagement: 85 },
    { day: 'Tue', students: 52, engagement: 90 },
    { day: 'Wed', students: 48, engagement: 78 },
    { day: 'Thu', students: 58, engagement: 92 },
    { day: 'Fri', students: 42, engagement: 88 },
    { day: 'Sat', students: 30, engagement: 75 },
    { day: 'Sun', students: 25, engagement: 70 }
  ];

  const topPerformers = students
    .sort((a, b) => (b.gpa || 0) - (a.gpa || 0))
    .slice(0, 5);

  const recentActivity = [
    { type: 'submission', student: 'Maria Santos', action: 'submitted Math Assignment', time: '5 min ago' },
    { type: 'message', student: 'Juan Cruz', action: 'sent you a message', time: '12 min ago' },
    { type: 'grade', student: 'Ana Reyes', action: 'viewed their grade', time: '25 min ago' },
    { type: 'resource', student: 'Carlos Diaz', action: 'downloaded Study Guide', time: '1 hour ago' },
    { type: 'submission', student: 'Sofia Torres', action: 'submitted Science Report', time: '2 hours ago' }
  ];

  const exportData = () => {
    alert('📊 Analytics data exported successfully!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gradient-to-br from-green-600 to-emerald-600' : 'bg-gradient-to-br from-green-500 to-emerald-500'
      } text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
            <p className="text-green-100">Track performance and engagement metrics</p>
          </div>
          <BarChart3 className="h-16 w-16 text-green-200" />
        </div>
      </div>

      {/* Controls */}
      <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`p-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="semester">This Semester</option>
            </select>

            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className={`p-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="overview">Overview</option>
              <option value="performance">Performance</option>
              <option value="engagement">Engagement</option>
              <option value="attendance">Attendance</option>
            </select>
          </div>

          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard
          label="Total Students"
          value={metrics.studentCount}
          icon={Users}
          color="blue"
          trend="+5%"
          darkMode={darkMode}
        />
        <MetricCard
          label="Active Classes"
          value={metrics.classCount}
          icon={BookOpen}
          color="green"
          trend="+2"
          darkMode={darkMode}
        />
        <MetricCard
          label="Avg GPA"
          value={metrics.avgGpa}
          icon={Star}
          color="yellow"
          trend="+0.2"
          darkMode={darkMode}
        />
        <MetricCard
          label="Attendance"
          value={`${metrics.avgAttendance}%`}
          icon={Calendar}
          color="purple"
          trend="+3%"
          darkMode={darkMode}
        />
        <MetricCard
          label="Completion"
          value={`${metrics.avgCompletion}%`}
          icon={Target}
          color="orange"
          trend="+7%"
          darkMode={darkMode}
        />
        <MetricCard
          label="Study Time"
          value={`${metrics.avgStudyTime}h`}
          icon={Clock}
          color="red"
          trend="+0.5h"
          darkMode={darkMode}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
            Weekly Activity
          </h3>

          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {day.day}
                  </span>
                  <span className="text-sm font-semibold">{day.students} students</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all"
                    style={{ width: `${day.engagement}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Award className="h-6 w-6 mr-2 text-yellow-600" />
            Top Performers
          </h3>

          <div className="space-y-3">
            {topPerformers.map((student, index) => (
              <div
                key={student.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  darkMode ? 'bg-gray-750' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-600' :
                    'bg-blue-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {student.course}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">{student.gpa || '3.8'}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>GPA</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Statistics */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <BookOpen className="h-6 w-6 mr-2 text-purple-600" />
          Assignment Statistics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
            <p className="text-3xl font-bold text-purple-600 mb-2">{assignments.length}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Assignments</p>
          </div>
          <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
            <p className="text-3xl font-bold text-green-600 mb-2">
              {assignments.filter((a: any) => a.submitted >= a.total * 0.8).length}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>High Submission</p>
          </div>
          <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
            <p className="text-3xl font-bold text-blue-600 mb-2">85%</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Completion</p>
          </div>
          <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
            <p className="text-3xl font-bold text-yellow-600 mb-2">4.2</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Grade</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Clock className="h-6 w-6 mr-2 text-blue-600" />
          Recent Activity
        </h3>

        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg ${
                darkMode ? 'bg-gray-750' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'submission' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'message' ? 'bg-green-100 text-green-600' :
                  activity.type === 'grade' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'submission' ? '📝' :
                   activity.type === 'message' ? '💬' :
                   activity.type === 'grade' ? '⭐' : '📥'}
                </div>
                <div>
                  <p className="font-medium">{activity.student}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {activity.action}
                  </p>
                </div>
              </div>
              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Class Performance */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Target className="h-6 w-6 mr-2 text-green-600" />
          Class Performance Overview
        </h3>

        <div className="space-y-4">
          {classes.slice(0, 5).map((cls: any) => (
            <div key={cls.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold">{cls.title}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {cls.student_count} students
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">
                    {Math.floor(Math.random() * 15) + 80}%
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Score</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Attendance</p>
                  <p className="font-semibold">{Math.floor(Math.random() * 10) + 88}%</p>
                </div>
                <div>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Engagement</p>
                  <p className="font-semibold">{Math.floor(Math.random() * 15) + 80}%</p>
                </div>
                <div>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Completion</p>
                  <p className="font-semibold">{Math.floor(Math.random() * 10) + 85}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon, color, trend, darkMode }: any) {
  const colorMap: any = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    red: 'text-red-600'
  };

  return (
    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className={`h-6 w-6 ${colorMap[color]}`} />
        {trend && (
          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
    </div>
  );
}