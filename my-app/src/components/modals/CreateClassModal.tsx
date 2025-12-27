import { useState } from 'react';
import { X, BookOpen, Calendar, Award, FileText, Clock, Upload, File } from 'lucide-react';

interface Props {
  darkMode: boolean;
  onClose: () => void;
  onSuccess: () => void;
  classes: any[];
  apiEndpoint?: string;
}

export default function CreateAssignmentModal({ darkMode, onClose, onSuccess, classes, apiEndpoint = '/api' }: Props) {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    courseId: '',
    dueDate: '',
    points: '100',
    description: '',
    fileUrl: ''
  });
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setAttachmentFile(file);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.subject || !formData.dueDate) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      // In a real implementation, you would upload the file first
      // For now, we'll just include a file URL placeholder
      let fileUrl = formData.fileUrl;
      
      if (attachmentFile) {
        // TODO: Upload file to storage service (Cloudflare R2, AWS S3, etc.)
        // For demo purposes, we'll use a placeholder
        fileUrl = `https://storage.example.com/assignments/${attachmentFile.name}`;
      }

      const response = await fetch(`${apiEndpoint}/teacher/assignments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          subject: formData.subject,
          dueDate: formData.dueDate,
          description: formData.description,
          points: Number(formData.points) || 100,
          courseId: formData.courseId || null,
          fileUrl: fileUrl || null
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create assignment');
      }

      setLoading(false);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fadeIn">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-2xl rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Create Assignment</h3>
              <p className="text-sm text-purple-100">Add a new assignment for your students</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Assignment Title */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Assignment Title <span className="text-red-500">*</span>
              </label>
              <input 
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="e.g., Chapter 1: Introduction to Variables"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Subject */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject <span className="text-red-500">*</span>
                </label>
                <input 
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="e.g., Mathematics"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  onKeyPress={handleKeyPress}
                />
              </div>

              {/* Class (Optional) */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Class (Optional)
                </label>
                <select
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                >
                  <option value="">Select a class...</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Due Date */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Due Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className={`absolute left-3 top-3 h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input 
                    type="date"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Points */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Points
                </label>
                <div className="relative">
                  <Award className={`absolute left-3 top-3 h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input 
                    type="number"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="100"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Instructions & Description
              </label>
              <div className="relative">
                <FileText className={`absolute left-3 top-3 h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <textarea 
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Detailed instructions for the assignment..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            {/* File Attachment */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Attach File (PDF, DOC, DOCX - Max 10MB)
              </label>
              <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                darkMode 
                  ? 'border-gray-600 bg-gray-750 hover:border-purple-500' 
                  : 'border-gray-300 bg-gray-50 hover:border-purple-400'
              }`}>
                <Upload className="h-10 w-10 mx-auto mb-3 text-purple-600" />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="assignment-file-upload"
                />
                <label
                  htmlFor="assignment-file-upload"
                  className="cursor-pointer px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-block"
                >
                  Choose File
                </label>
                {attachmentFile && (
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <File className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">{attachmentFile.name}</span>
                    <span className="text-xs text-gray-500">
                      ({(attachmentFile.size / 1024).toFixed(2)} KB)
                    </span>
                    <button
                      onClick={() => setAttachmentFile(null)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Or paste a file URL below
                </p>
              </div>
            </div>

            {/* File URL (Alternative) */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Or File URL (Optional)
              </label>
              <input 
                type="url"
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="https://example.com/assignment.pdf"
                value={formData.fileUrl}
                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                onKeyPress={handleKeyPress}
              />
            </div>

            {/* Quick Info */}
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-purple-50'} border ${darkMode ? 'border-gray-700' : 'border-purple-200'}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Quick Info</span>
              </div>
              <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>• Students will be notified automatically</li>
                <li>• Assignment will appear in their dashboard immediately</li>
                <li>• Students can download the attached file</li>
                <li>• You can grade submissions from the Assignments page</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
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
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Assignment'}
          </button>
        </div>

        <p className={`text-xs text-center pb-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          Press Ctrl + Enter to submit quickly
        </p>
      </div>
    </div>
  );
}