import { useState } from 'react';
import { X, BookOpen, Calendar, Award, FileText, Clock } from 'lucide-react';
import { api } from '../../services/api/api';

interface Props {
  darkMode: boolean;
  onClose: () => void;
  onSuccess: () => void;
  classes: any[];
}

export default function CreateAssignmentModal({ darkMode, onClose, onSuccess, classes }: Props) {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    courseId: '',
    dueDate: '',
    points: '100',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!formData.title || !formData.subject || !formData.dueDate) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    const response = await api.createAssignment({
      title: formData.title,
      subject: formData.subject,
      dueDate: formData.dueDate,
      description: formData.description,
      points: Number(formData.points) || 0
    });

    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    onSuccess();
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fadeIn">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-2xl rounded-xl p-6 shadow-2xl`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Create Assignment</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Add a new assignment for your students
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
          {/* Assignment Title */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Assignment Title *
            </label>
            <input 
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="Chapter 1: Introduction to Variables"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Mathematics"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                onKeyPress={handleKeyPress}
              />
            </div>

            {/* Class (Optional) */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
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
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Due Date *
              </label>
              <div className="relative">
                <Calendar className={`absolute left-3 top-3 h-5 w-5 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
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
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Points
              </label>
              <div className="relative">
                <Award className={`absolute left-3 top-3 h-5 w-5 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
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
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Instructions & Description
            </label>
            <div className="relative">
              <FileText className={`absolute left-3 top-3 h-5 w-5 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`} />
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

          {/* Quick Info */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-purple-50'} border ${darkMode ? 'border-gray-700' : 'border-purple-200'}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Quick Info</span>
            </div>
            <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>• Students will be notified automatically</li>
              <li>• Assignment will appear in their dashboard immediately</li>
              <li>• You can grade submissions from the Analytics page</li>
            </ul>
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
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Assignment'}
          </button>
        </div>

        <p className={`text-xs text-center mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          Press Ctrl + Enter to submit quickly
        </p>
      </div>
    </div>
  );
}