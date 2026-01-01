import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Library, Search, Filter, Download, FileText, Video, Link, Plus, X, BookOpen } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description?: string;
  subject: string;
  type: string;
  file_url?: string;
  uploaded_by?: string;
  download_count?: number;
}

interface ResourcesProps {
  resources?: Resource[];
  darkMode?: boolean;
  currentUser?: { role?: string };
  setResources?: Dispatch<SetStateAction<Resource[]>>;
}

export default function Resources({ resources: resourcesProp = [], darkMode = false, currentUser = { role: 'student' }, setResources: setResourcesProp }: ResourcesProps) {
  // use a local resources state (avoid name collision with parent setter)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    subject: '',
    type: 'PDF',
    description: '',
    fileUrl: ''
  });

  const defaultResources: Resource[] = [
    {
      id: '1',
      title: 'Introduction to Python Programming',
      description: 'Complete guide to Python basics, data structures, and OOP concepts',
      subject: 'Programming',
      type: 'PDF',
      file_url: 'https://example.com/python-guide.pdf',
      uploaded_by: 'Admin',
      download_count: 245
    },
    {
      id: '2',
      title: 'Database Design Fundamentals',
      description: 'Learn about normalization, ER diagrams, and SQL queries',
      subject: 'Database',
      type: 'PDF',
      file_url: 'https://example.com/database-design.pdf',
      uploaded_by: 'Admin',
      download_count: 189
    },
    {
      id: '3',
      title: 'React Tutorial Series',
      description: 'Video series covering React hooks, components, and state management',
      subject: 'Web Development',
      type: 'Video',
      file_url: 'https://youtube.com/watch?v=example',
      uploaded_by: 'Admin',
      download_count: 312
    },
    {
      id: '4',
      title: 'Networking Basics',
      description: 'Understanding TCP/IP, OSI model, and network protocols',
      subject: 'Networking',
      type: 'PDF',
      file_url: 'https://example.com/networking.pdf',
      uploaded_by: 'Admin',
      download_count: 156
    },
    {
      id: '5',
      title: 'Data Structures & Algorithms',
      description: 'Interactive course on common algorithms and problem-solving techniques',
      subject: 'Programming',
      type: 'Link',
      file_url: 'https://leetcode.com',
      uploaded_by: 'Admin',
      download_count: 421
    },
    {
      id: '6',
      title: 'Web Security Best Practices',
      description: 'Learn about OWASP Top 10, secure coding, and common vulnerabilities',
      subject: 'Web Development',
      type: 'Document',
      file_url: 'https://example.com/security.docx',
      uploaded_by: 'Admin',
      download_count: 198
    },
    {
      id: '7',
      title: 'Calculus I Reference Sheet',
      description: 'Quick reference for derivatives, integrals, and limits',
      subject: 'Math',
      type: 'PDF',
      file_url: 'https://example.com/calculus.pdf',
      uploaded_by: 'Admin',
      download_count: 267
    },
    {
      id: '8',
      title: 'Physics Lab Manual',
      description: 'Complete laboratory procedures and experiments',
      subject: 'Science',
      type: 'PDF',
      file_url: 'https://example.com/physics-lab.pdf',
      uploaded_by: 'Admin',
      download_count: 134
    }
  ];

  const [localResources, setLocalResources] = useState<Resource[]>(
    resourcesProp && resourcesProp.length ? resourcesProp : defaultResources
  );
  

  const types = ['All', 'PDF', 'Video', 'Link', 'Document', 'Presentation'];
  const subjects = ['All', 'Programming', 'Database', 'Networking', 'Web Development', 'Math', 'Science'];

  const filteredResources = localResources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || r.type === selectedType;
    const matchesSubject = selectedSubject === 'All' || r.subject === selectedSubject;
    return matchesSearch && matchesType && matchesSubject;
  });

  const handleUpload = () => {
    if (!uploadForm.title || !uploadForm.subject) {
      alert('Please fill in all required fields');
      return;
    }

    const newResource = {
      id: Date.now().toString(),
      title: uploadForm.title,
      subject: uploadForm.subject,
      type: uploadForm.type,
      description: uploadForm.description,
      file_url: uploadForm.fileUrl,
      uploaded_by: 'Admin',
      download_count: 0
    };

    setLocalResources([newResource, ...localResources]);
    // also notify parent if it provided a setter
    if (setResourcesProp) setResourcesProp(prev => [newResource, ...prev]);
    setUploadForm({ title: '', subject: '', type: 'PDF', description: '', fileUrl: '' });
    setShowUploadModal(false);
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'PDF': return FileText;
      case 'Video': return Video;
      case 'Link': return Link;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'PDF': return 'red';
      case 'Video': return 'purple';
      case 'Link': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gradient-to-br from-blue-600 to-indigo-600' : 'bg-gradient-to-br from-blue-500 to-indigo-500'
      } text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Study Resources</h2>
            <p className="text-blue-100">Access learning materials and study guides</p>
          </div>
          <Library className="h-16 w-16 text-blue-200" />
        </div>
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-2 flex-1 w-full md:w-auto">
            <div className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg flex-1 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <Search className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`bg-transparent outline-none flex-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              />
            </div>
          </div>
          
          {currentUser.role === 'admin' && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              <span>Upload Resource</span>
            </button>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Type:</span>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium ${
                    selectedType === type
                      ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Subject:</span>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {subjects.map(subject => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium ${
                    selectedSubject === subject
                      ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                      : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-4">
          {filteredResources.length} {filteredResources.length === 1 ? 'Resource' : 'Resources'} Found
        </h3>

        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <Library className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className="text-xl font-semibold mb-2">No Resources Found</h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {searchQuery || selectedType !== 'All' || selectedSubject !== 'All'
                ? 'Try adjusting your filters'
                : 'No resources available yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map(resource => {
              const TypeIcon = getTypeIcon(resource.type);
              const color = getTypeColor(resource.type);
              
              return (
                <div
                  key={resource.id}
                  className={`p-5 rounded-xl border-2 transition-all hover:shadow-lg ${
                    darkMode
                      ? 'bg-gray-750 border-gray-700 hover:border-blue-600'
                      : 'bg-white border-gray-200 hover:border-blue-500'
                  }`}
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`w-12 h-12 rounded-lg bg-${color}-600 flex items-center justify-center flex-shrink-0`}>
                      <TypeIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-1 line-clamp-2">{resource.title}</h4>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {resource.subject}
                      </p>
                    </div>
                  </div>

                  {resource.description && (
                    <p className={`text-sm mb-3 line-clamp-2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {resource.description}
                    </p>
                  )}

                  <div className={`flex items-center justify-between pt-3 border-t ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-1 text-sm">
                      <Download className="h-4 w-4 text-gray-500" />
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {resource.download_count || 0}
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showUploadModal && currentUser.role === 'admin' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-md rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Upload Resource</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Title *
                </label>
                <input
                  className={`w-full p-3 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Resource title"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject *
                </label>
                <select
                  className={`w-full p-3 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  value={uploadForm.subject}
                  onChange={(e) => setUploadForm({ ...uploadForm, subject: e.target.value })}
                >
                  <option value="">Select subject</option>
                  {subjects.filter(s => s !== 'All').map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Type *
                </label>
                <select
                  className={`w-full p-3 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  value={uploadForm.type}
                  onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                >
                  {types.filter(t => t !== 'All').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  File URL
                </label>
                <input
                  className={`w-full p-3 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="https://..."
                  value={uploadForm.fileUrl}
                  onChange={(e) => setUploadForm({ ...uploadForm, fileUrl: e.target.value })}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  className={`w-full p-3 border rounded-lg ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  placeholder="Resource description..."
                  rows={3}
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className={`px-4 py-2 rounded-lg border ${
                    darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Upload Resource
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}