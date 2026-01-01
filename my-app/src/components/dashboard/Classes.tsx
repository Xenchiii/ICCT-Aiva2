import { useState, useEffect, useRef } from 'react';
import { Video, Plus, Calendar, Clock, Users, Copy, Check, Play, StopCircle, X, Loader, ExternalLink, AlertCircle } from 'lucide-react';

interface Props {
  currentUser: any;
  darkMode: boolean;
  apiEndpoint?: string;
}

interface ClassSession {
  id: string;
  title: string;
  subject: string;
  code: string;
  schedule: string;
  room: string;
  teacher_name: string;
  student_count: number;
  meeting_link?: string;
  meeting_id?: string;
  is_live?: boolean;
  start_time?: string;
  end_time?: string;
  duration?: number;
}

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export default function Classes({ currentUser, darkMode, apiEndpoint = '/api' }: Props) {
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);
  const [inCall, setInCall] = useState(false);
  const [copied, setCopied] = useState(false);
  const [jitsiLoaded, setJitsiLoaded] = useState(false);
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => setJitsiLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let endpoint = '/teacher/classes';
      
      if (currentUser?.role === 'student') {
        endpoint = '/student/classes';
      } else if (currentUser?.role === 'admin') {
        endpoint = '/teacher/classes';
      }
      
      const response = await fetch(`${apiEndpoint}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setClasses(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Failed to load classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const createVideoClass = async (classData: any) => {
    try {
      const token = localStorage.getItem('token');
      
      const meetingId = `${classData.code}-${Date.now()}`.toUpperCase();
      const meetingLink = `https://meet.jit.si/${meetingId}`;
      
      const newClass = {
        ...classData,
        meeting_id: meetingId,
        meeting_link: meetingLink,
        is_live: false,
        created_at: new Date().toISOString()
      };

      const response = await fetch(`${apiEndpoint}/teacher/classes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClass)
      });

      if (response.ok) {
        await loadClasses();
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Failed to create class:', error);
    }
  };

  const startVideoCall = async (classSession: ClassSession) => {
    try {
      const token = localStorage.getItem('token');
      
      await fetch(`${apiEndpoint}/classes/${classSession.id}/start`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          start_time: new Date().toISOString()
        })
      });

      setClasses(classes.map(c => 
        c.id === classSession.id ? { ...c, is_live: true } : c
      ));

      setSelectedClass(classSession);
      setInCall(true);
    } catch (error) {
      console.error('Failed to start video call:', error);
    }
  };

  const joinVideoCall = async (classSession: ClassSession) => {
    try {
      const token = localStorage.getItem('token');
      
      await fetch(`${apiEndpoint}/classes/${classSession.id}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: currentUser?.id,
          joined_at: new Date().toISOString()
        })
      });

      setSelectedClass(classSession);
      setInCall(true);
    } catch (error) {
      console.error('Failed to join video call:', error);
    }
  };

  const endVideoCall = async () => {
    if (!selectedClass) return;

    try {
      const token = localStorage.getItem('token');
      
      await fetch(`${apiEndpoint}/classes/${selectedClass.id}/end`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          end_time: new Date().toISOString()
        })
      });

      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }

      await loadClasses();
      setInCall(false);
      setSelectedClass(null);
    } catch (error) {
      console.error('Failed to end video call:', error);
    }
  };

  const copyMeetingLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (inCall && selectedClass && jitsiLoaded && jitsiContainerRef.current && !jitsiApiRef.current) {
      const domain = 'meet.jit.si';
      const options = {
        roomName: selectedClass.meeting_id,
        width: '100%',
        height: '100%',
        parentNode: jitsiContainerRef.current,
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          disableModeratorIndicator: false,
          enableWelcomePage: false,
          prejoinPageEnabled: false,
          disableDeepLinking: true,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 
            'fullscreen', 'fodeviceselection', 'hangup', 'profile',
            'chat', 'recording', 'livestreaming', 'etherpad', 'sharedvideo',
            'settings', 'raisehand', 'videoquality', 'filmstrip',
            'feedback', 'stats', 'shortcuts', 'tileview', 'download',
            'help', 'mute-everyone'
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
        userInfo: {
          displayName: currentUser?.name || 'User'
        }
      };

      try {
        jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);

        jitsiApiRef.current.addEventListener('videoConferenceLeft', () => {
          endVideoCall();
        });

        jitsiApiRef.current.addEventListener('readyToClose', () => {
          endVideoCall();
        });
      } catch (error) {
        console.error('Failed to initialize Jitsi:', error);
      }
    }

    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }
    };
  }, [inCall, selectedClass, jitsiLoaded]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Loading classes...</p>
        </div>
      </div>
    );
  }

  if (inCall && selectedClass) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">{selectedClass.title}</h3>
            <p className="text-sm text-gray-400">{selectedClass.code} • Online</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 bg-red-500 rounded-full flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">LIVE</span>
            </div>
            <button
              onClick={endVideoCall}
              className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all flex items-center space-x-2 font-semibold"
            >
              <StopCircle className="h-5 w-5" />
              <span>End Call</span>
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          {!jitsiLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <Loader className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
                <p className="text-white">Loading video call...</p>
              </div>
            </div>
          ) : (
            <div ref={jitsiContainerRef} className="w-full h-full" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'
      } text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {currentUser?.role === 'admin' ? 'All Online Classes' : 'Online Classes'}
            </h2>
            <p className="text-purple-100">
              {currentUser?.role === 'teacher' 
                ? 'Create and manage your online video classes'
                : currentUser?.role === 'admin'
                ? 'Monitor and manage all online video classes'
                : 'Join your scheduled online classes'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {currentUser?.role === 'teacher' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Create Class</span>
              </button>
            )}
            <Video className="h-20 w-20 text-purple-200" />
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'} flex items-start space-x-3`}>
        <AlertCircle className={`h-5 w-5 mt-0.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <div>
          <p className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
            100% Online Video Classes - Powered by Jitsi Meet
          </p>
          <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
            Free, unlimited video calls with screen sharing, chat, and recording features. No downloads required - join directly from your browser.
          </p>
        </div>
      </div>

      {classes.filter(c => c.is_live).length > 0 && (
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
            Live Classes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.filter(c => c.is_live).map((classSession) => (
              <ClassCard
                key={classSession.id}
                classSession={classSession}
                darkMode={darkMode}
                isLive={true}
                onJoin={() => joinVideoCall(classSession)}
                onStart={() => startVideoCall(classSession)}
                onCopyLink={() => copyMeetingLink(classSession.meeting_link!)}
                copied={copied}
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>
      )}

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-4">
          {currentUser?.role === 'teacher' ? 'Your Classes' : 
           currentUser?.role === 'admin' ? 'All Scheduled Classes' :
           'Upcoming Classes'}
        </h3>
        {classes.filter(c => !c.is_live).length === 0 ? (
          <div className="text-center py-16">
            <Video className={`h-20 w-20 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {currentUser?.role === 'teacher' 
                ? 'No classes yet. Create your first online video class!'
                : 'No upcoming classes scheduled'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.filter(c => !c.is_live).map((classSession) => (
              <ClassCard
                key={classSession.id}
                classSession={classSession}
                darkMode={darkMode}
                isLive={false}
                onStart={() => startVideoCall(classSession)}
                onJoin={() => setShowJoinModal(true)}
                onCopyLink={() => copyMeetingLink(classSession.meeting_link!)}
                copied={copied}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateClassModal
          darkMode={darkMode}
          onClose={() => setShowCreateModal(false)}
          onCreate={createVideoClass}
        />
      )}

      {showJoinModal && (
        <JoinClassModal
          darkMode={darkMode}
          onClose={() => setShowJoinModal(false)}
          onJoin={(meetingId: string) => {
            const classSession = classes.find(c => c.meeting_id === meetingId);
            if (classSession) {
              joinVideoCall(classSession);
              setShowJoinModal(false);
            }
          }}
        />
      )}
    </div>
  );
}

function ClassCard({ classSession, darkMode, isLive, onStart, onJoin, onCopyLink, copied, currentUser }: any) {
  const isTeacher = currentUser?.role === 'teacher';
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className={`p-6 rounded-xl ${
      darkMode ? 'bg-gray-750 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
    } transition-all hover:shadow-lg relative`}>
      {isLive && (
        <div className="absolute top-4 right-4 flex items-center space-x-2 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>LIVE</span>
        </div>
      )}

      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          isLive ? 'bg-red-100' : 'bg-purple-100'
        }`}>
          <Video className={`h-6 w-6 ${isLive ? 'text-red-600' : 'text-purple-600'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold truncate">{classSession.title}</h4>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {classSession.code}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm mb-4">
        {classSession.teacher_name && (
          <div className="flex items-center space-x-2">
            <Users className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              {classSession.teacher_name}
            </span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Calendar className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {classSession.schedule}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {classSession.duration || 60} minutes
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {classSession.student_count || 0} students
          </span>
        </div>
        <div className={`flex items-center space-x-2 px-2 py-1 rounded ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
          <Video className={`h-4 w-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <span className={`${darkMode ? 'text-purple-300' : 'text-purple-700'} font-medium text-xs`}>
            Online Class
          </span>
        </div>
      </div>

      {classSession.meeting_link && (
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-4`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Meeting ID
            </span>
            <button
              onClick={onCopyLink}
              className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              title="Copy meeting link"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <code className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate block`}>
            {classSession.meeting_id}
          </code>
        </div>
      )}

      <div className="flex space-x-2">
        {(isTeacher || isAdmin) ? (
          isLive ? (
            <button
              onClick={onJoin}
              className="flex-1 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Join Class
            </button>
          ) : (
            <button
              onClick={onStart}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Start Class</span>
            </button>
          )
        ) : (
          <button
            onClick={onJoin}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              isLive
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-lg'
                : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`
            }`}
            disabled={!isLive}
          >
            {isLive ? 'Join Now' : 'Not Started'}
          </button>
        )}
        {classSession.meeting_link && (
          <a
            href={classSession.meeting_link}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-all`}
            title="Open in new tab"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
}

function CreateClassModal({ darkMode, onClose, onCreate }: any) {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    code: '',
    schedule: '',
    room: 'Online',
    duration: 60,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-md w-full`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Create Online Class</h3>
            <button onClick={onClose} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Class Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-300'
                }`}
                placeholder="Introduction to Programming"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Subject *</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-300'
                  }`}
                  placeholder="Computer Science"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Code *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-300'
                  }`}
                  placeholder="CS101"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Schedule *</label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-300'
                }`}
                placeholder="Mon/Wed 10:00 AM"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Duration (minutes) *</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-300'
                }`}
                min="15"
                max="999"
                required
              />
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-purple-900/30 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
              <div className="flex items-center space-x-2 mb-1">
                <Video className={`h-4 w-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`text-sm font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                  Online Video Class
                </span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                This class will be conducted 100% online. A unique meeting link will be generated automatically.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-300'
                }`}
                rows={3}
                placeholder="Class description and learning objectives..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Create Online Class
            </button>
          </form>
      </div>
    </div>
  );
}

function JoinClassModal({ darkMode, onClose, onJoin }: any) {
  const [meetingId, setMeetingId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onJoin(meetingId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-md w-full`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Join Online Class</h3>
          <button onClick={onClose} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Meeting ID</label>
            <input
              type="text"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value.toUpperCase())}
              className={`w-full px-4 py-3 rounded-lg border text-center text-lg font-mono ${
                darkMode ? 'bg-gray-750 border-gray-600' : 'bg-gray-50 border-gray-300'
              }`}
              placeholder="CS101-1234567890"
              required
            />
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Enter the meeting ID provided by your teacher
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Video className="h-5 w-5" />
            <span>Join Class</span>
          </button>
        </form>
      </div>
    </div>
  );
}