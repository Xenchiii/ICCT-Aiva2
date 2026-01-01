import { useState } from 'react';
import { X, Upload, FileText, Book, Video, File } from 'lucide-react';
import { api } from '../../services/api/api';

interface Props {
  darkMode: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UploadResourceModal({ darkMode, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    type: 'pdf',
    fileUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resourceTypes = [
    { value: 'pdf', label: 'PDF Document', icon: FileText },
    { value: 'video', label: 'Video', icon: Video },
    { value: 'slides', label: 'Slides', icon: Book },
    { value: 'other', label: 'Other', icon: File }
  ];

  const handleSubmit = async () => {
    if (!formData.title || !formData.subject || !formData.fileUrl) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    const response = await api.createResource(formData);

    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fadeIn">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-2xl rounded-xl p-6 shadow-2xl`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Upload Resource</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Share study materials with students
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          {/* Resource Type */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Resource Type *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {resourceTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFormData({ ...formData, type: type.value })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.type === type.value
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : darkMode
                        ? 'border-gray-600 hover:bg-gray-700'
                        : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <type.icon className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-xs font-medium">{type.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Title *
            </label>
            <input 
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Chapter 1: Introduction to Algorithms"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Subject */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Subject *
            </label>
            <input 
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Computer Science"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          {/* File URL */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              File URL *
            </label>
            <input 
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="https://example.com/file.pdf"
              value={formData.fileUrl}
              onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
            />
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Provide a direct link to the file (Google Drive, Dropbox, etc.)
            </p>
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Description
            </label>
            <textarea 
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Brief description of the resource..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Upload Info */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-blue-50'} border ${darkMode ? 'border-gray-700' : 'border-blue-200'}`}>
            <div className="flex items-start space-x-3">
              <Upload className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p className="font-medium mb-1">Tips for uploading resources:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Use cloud storage services for large files</li>
                  <li>• Ensure files are publicly accessible or shared with students</li>
                  <li>• Organize files with clear naming conventions</li>
                  <li>• Consider adding version numbers for updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-700">
          <button 
            onClick={onClose} 
            className={`px-6 py-2.5 rounded-lg border transition-colors ${
              darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
            }`}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload Resource'}
          </button>
        </div>
      </div>
    </div>
  );
}