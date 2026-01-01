import { useState } from 'react';
import { Activity, TrendingUp, Trophy, Zap, Calendar, Clock, Award, BookOpen, Users, Target, X, FileText, Download, CheckCircle } from 'lucide-react';

type ActivityType = {
  id: string;
  type: string;
  title: string;
  teacher: string;
  subject: string;
  description: string;
  fullDescription?: string;
  instructions?: string[];
  attachments?: { name: string; size: string }[];
  dueDate?: string;
  points?: number;
  time: string;
  status: string;
  submissionType?: string;
  maxAttempts?: number;
  grade?: string;
  feedback?: string;
};

export default function StudentActivities() {
  const darkMode = false;
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  
  const currentUser = {
    id: 'student1',
    name: 'John Doe',
    role: 'student',
    streak: 5,
    level: 3,
    points: 450
  };

  const [activities] = useState([
    {
      id: '1',
      type: 'assignment',
      title: 'Math Assignment Posted',
      teacher: 'Miss Jenny Bautista',
      subject: 'Mathematics',
      description: 'Complete exercises 1-10 from Chapter 3',
      fullDescription: 'Complete all exercises from 1-10 in Chapter 3: Calculus and Derivatives. Show all your work and explain your reasoning for each problem. This assignment will test your understanding of limits, derivatives, and their applications.',
      instructions: [
        'Read Chapter 3 thoroughly before starting',
        'Show all steps in your calculations',
        'Include graphs where applicable',
        'Submit your work in PDF format'
      ],
      attachments: [
        { name: 'Chapter_3_Exercises.pdf', size: '2.3 MB' },
        { name: 'Formula_Sheet.pdf', size: '1.1 MB' }
      ],
      dueDate: 'Oct 20, 2025',
      points: 50,
      time: '2 hours ago',
      status: 'pending',
      submissionType: 'File Upload',
      maxAttempts: 1
    },
    {
      id: '2',
      type: 'announcement',
      title: 'Class Schedule Update',
      teacher: 'Sir Joriz D. Chiong',
      subject: 'Computer Science',
      description: 'Tomorrow\'s class has been moved to Room 301',
      fullDescription: 'Due to facility maintenance in Room 205, tomorrow\'s Computer Science lecture has been moved to Room 301. The class time remains the same at 10:00 AM. Please make note of this change and arrive on time.',
      time: '5 hours ago',
      status: 'info'
    },
    {
      id: '3',
      type: 'resource',
      title: 'New Study Material Available',
      teacher: 'Miss Mara Caratao',
      subject: 'Engineering',
      description: 'Chapter 5 lecture notes and practice problems uploaded',
      fullDescription: 'I have uploaded the complete lecture notes for Chapter 5: Structural Analysis, along with practice problems and solutions. These materials will help you prepare for the upcoming midterm exam.',
      attachments: [
        { name: 'Chapter_5_Notes.pdf', size: '5.2 MB' },
        { name: 'Practice_Problems.pdf', size: '1.8 MB' },
        { name: 'Solutions.pdf', size: '2.1 MB' }
      ],
      time: 'Yesterday',
      status: 'new'
    },
    {
      id: '4',
      type: 'grade',
      title: 'Assignment Graded',
      teacher: 'Miss Jenny Bautista',
      subject: 'Mathematics',
      description: 'Your submission for "Calculus Quiz" has been graded',
      fullDescription: 'Your submission for the Calculus Quiz has been graded. You scored 45 out of 50 points (90%). Great work! Review the feedback provided to understand where you can improve.',
      feedback: 'Excellent work on problems 1-8! Problem 9 needed more detailed explanation of the chain rule application. Problem 10 was correct but could be simplified further.',
      points: 45,
      grade: '90%',
      time: 'Yesterday',
      status: 'completed'
    },
    {
      id: '5',
      type: 'assignment',
      title: 'Programming Project Posted',
      teacher: 'Sir Joriz D. Chiong',
      subject: 'Computer Science',
      description: 'Create a simple calculator using Python',
      fullDescription: 'Create a fully functional calculator application using Python. The calculator should support basic arithmetic operations (addition, subtraction, multiplication, division) and include a graphical user interface using Tkinter.',
      instructions: [
        'Use Python 3.x for development',
        'Implement a GUI using Tkinter',
        'Include error handling for division by zero',
        'Add support for decimal numbers',
        'Include a clear button to reset calculations',
        'Submit your code with comments explaining your logic'
      ],
      attachments: [
        { name: 'Project_Requirements.pdf', size: '800 KB' },
        { name: 'Sample_Output.png', size: '450 KB' }
      ],
      dueDate: 'Oct 25, 2025',
      points: 100,
      time: '2 days ago',
      status: 'pending',
      submissionType: 'File Upload',
      maxAttempts: 2
    }
  ]);

  const stats = [
    { label: 'Active Tasks', value: activities.filter(a => a.status === 'pending').length, icon: Activity, color: 'blue' },
    { label: 'Completed', value: activities.filter(a => a.status === 'completed').length, icon: Trophy, color: 'green' },
    { label: 'Total XP', value: currentUser.points, icon: Zap, color: 'yellow' },
    { label: 'Streak Days', value: currentUser.streak, icon: Target, color: 'orange' }
  ];

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'assignment': return '📝';
      case 'announcement': return '📢';
      case 'resource': return '📚';
      case 'grade': return '⭐';
      default: return '📌';
    }
  };

  const getActivityColor = (type: string) => {
    switch(type) {
      case 'assignment': return 'from-blue-500 to-cyan-500';
      case 'announcement': return 'from-purple-500 to-pink-500';
      case 'resource': return 'from-green-500 to-emerald-500';
      case 'grade': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Pending</span>;
      case 'completed':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Completed</span>;
      case 'new':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">New</span>;
      case 'info':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Info</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gradient-to-br from-indigo-600 to-purple-600' : 'bg-gradient-to-br from-indigo-500 to-purple-500'
      } text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Activities & Updates</h2>
            <p className="text-indigo-100">Stay updated with your teachers' posts and assignments</p>
          </div>
          <Activity className="h-16 w-16 text-indigo-200" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorMap: any = {
            blue: 'from-blue-500 to-cyan-500',
            green: 'from-green-500 to-emerald-500',
            yellow: 'from-yellow-500 to-orange-500',
            orange: 'from-orange-500 to-red-500'
          };

          return (
            <div
              key={stat.label}
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all`}
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

      {/* Filter Tabs */}
      <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {['All', 'Assignments', 'Announcements', 'Resources', 'Grades'].map(filter => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium ${
                filter === 'All'
                  ? 'bg-indigo-600 text-white'
                  : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Feed */}
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Clock className="h-6 w-6 mr-2 text-indigo-600" />
          Recent Activities
        </h3>

        {activities.length === 0 ? (
          <div className="text-center py-12">
            <Activity className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
              No activities yet
            </p>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Activities from your teachers will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg ${
                  darkMode
                    ? 'bg-gray-750 border-gray-700 hover:border-indigo-600'
                    : 'bg-white border-gray-200 hover:border-indigo-500'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${getActivityColor(activity.type)} rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{activity.title}</h4>
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {activity.teacher}
                          </span>
                          <span className="text-gray-400">•</span>
                          <BookOpen className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {activity.subject}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getStatusBadge(activity.status)}
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {activity.time}
                        </span>
                      </div>
                    </div>

                    <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {activity.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        {activity.dueDate && (
                          <div className="flex items-center space-x-1 text-sm">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                              Due: {activity.dueDate}
                            </span>
                          </div>
                        )}
                        {activity.points && (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                            <Zap className="h-3 w-3" />
                            <span>{activity.points} XP</span>
                          </div>
                        )}
                        {activity.grade && (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            <Award className="h-3 w-3" />
                            <span>{activity.grade}</span>
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => setSelectedActivity(activity)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                      >
                        {activity.type === 'assignment' ? 'View Assignment' :
                         activity.type === 'resource' ? 'View Resource' :
                         activity.type === 'grade' ? 'View Details' : 'View'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
            This Week's Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>New Assignments</span>
              <span className="font-semibold text-blue-600">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Completed Tasks</span>
              <span className="font-semibold text-green-600">1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>XP Earned</span>
              <span className="font-semibold text-yellow-600">+95</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Resources Added</span>
              <span className="font-semibold text-purple-600">1</span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-red-600" />
            Upcoming Deadlines
          </h3>
          <div className="space-y-3">
            {activities
              .filter(a => a.type === 'assignment' && a.status === 'pending')
              .map(assignment => (
                <div key={assignment.id} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                  <p className="font-medium text-sm">{assignment.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {assignment.subject}
                    </span>
                    <span className="text-xs text-red-600 font-medium">{assignment.dueDate}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal for Activity Details */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto`}>
            {/* Modal Header */}
            <div className={`sticky top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6 flex items-start justify-between`}>
              <div className="flex items-start space-x-4 flex-1">
                <div className={`w-16 h-16 bg-gradient-to-br ${getActivityColor(selectedActivity.type)} rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>
                  {getActivityIcon(selectedActivity.type)}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedActivity.title}</h2>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedActivity.teacher}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedActivity.subject}
                    </span>
                    <span className="text-gray-400">•</span>
                    {getStatusBadge(selectedActivity.status)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Key Info */}
              <div className="flex items-center space-x-4">
                {selectedActivity.dueDate && (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">Due: {selectedActivity.dueDate}</span>
                  </div>
                )}
                {selectedActivity.points && (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg">
                    <Zap className="h-5 w-5" />
                    <span className="font-medium">{selectedActivity.points} Points</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  {selectedActivity.fullDescription || selectedActivity.description}
                </p>
              </div>

              {/* Instructions */}
              {selectedActivity.instructions && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                  <ol className="space-y-2">
                    {selectedActivity.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {instruction}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Feedback for Graded Work */}
              {selectedActivity.feedback && (
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <h3 className="text-lg font-semibold mb-2 text-green-900 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Teacher Feedback
                  </h3>
                  <p className="text-green-800">{selectedActivity.feedback}</p>
                </div>
              )}

              {/* Attachments */}
              {selectedActivity.attachments && selectedActivity.attachments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {selectedActivity.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                          darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <p className="font-medium">{attachment.name}</p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {attachment.size}
                            </p>
                          </div>
                        </div>
                        <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submission Info */}
              {selectedActivity.submissionType && (
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Submission Type:
                    </span>
                    <span className="text-indigo-600 font-semibold">{selectedActivity.submissionType}</span>
                  </div>
                  {selectedActivity.maxAttempts && (
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Attempts Allowed:
                      </span>
                      <span className="text-indigo-600 font-semibold">{selectedActivity.maxAttempts}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {selectedActivity.type === 'assignment' && selectedActivity.status === 'pending' && (
                  <button className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                    Submit Assignment
                  </button>
                )}
                {selectedActivity.type === 'resource' && (
                  <button className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Download All Resources
                  </button>
                )}
                <button
                  onClick={() => setSelectedActivity(null)}
                  className={`px-6 py-3 rounded-lg border-2 ${
                    darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                  } transition-colors font-medium`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}