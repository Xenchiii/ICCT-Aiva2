import { useState } from 'react';
import { X, Settings, User, Bell, Lock, Palette, Shield } from 'lucide-react';

interface Props {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onClose: () => void;
}

export default function SettingsModal({ darkMode, setDarkMode, onClose }: Props) {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    soundEnabled: true,
    language: 'en',
    timezone: 'Asia/Manila'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  const handleSave = () => {
    alert('✅ Settings saved successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fadeIn">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden`}>
        {/* Header */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Settings</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage your account preferences
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex" style={{ height: '500px' }}>
          {/* Sidebar */}
          <div className={`w-64 border-r ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'} p-4`}>
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? (darkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-900')
                      : (darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700')
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Profile Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Full Name
                      </label>
                      <input 
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email
                      </label>
                      <input 
                        type="email"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Bio
                      </label>
                      <textarea 
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Notification Preferences</h4>
                  <div className="space-y-4">
                    <ToggleSetting
                      label="Push Notifications"
                      description="Receive notifications in your browser"
                      checked={settings.notifications}
                      onChange={(checked: boolean) => setSettings({ ...settings, notifications: checked })}
                      darkMode={darkMode}
                    />
                    <ToggleSetting
                      label="Email Notifications"
                      description="Receive updates via email"
                      checked={settings.emailNotifications}
                      onChange={(checked: boolean) => setSettings({ ...settings, emailNotifications: checked })}
                      darkMode={darkMode}
                    />
                    <ToggleSetting
                      label="Sound Effects"
                      description="Play sounds for notifications"
                      checked={settings.soundEnabled}
                      onChange={(checked: boolean) => setSettings({ ...settings, soundEnabled: checked })}
                      darkMode={darkMode}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Security Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Current Password
                      </label>
                      <input 
                        type="password"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        New Password
                      </label>
                      <input 
                        type="password"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Confirm New Password
                      </label>
                      <input 
                        type="password"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                        }`}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Appearance Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Theme
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setDarkMode(false)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            !darkMode
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="w-full h-20 bg-white rounded mb-2 border border-gray-200"></div>
                          <p className="font-medium text-gray-900">Light Mode</p>
                        </button>
                        <button
                          onClick={() => setDarkMode(true)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            darkMode
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="w-full h-20 bg-gray-800 rounded mb-2 border border-gray-700"></div>
                          <p className="font-medium text-gray-900">Dark Mode</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Privacy Settings</h4>
                  <div className="space-y-4">
                    <ToggleSetting
                      label="Profile Visibility"
                      description="Allow others to view your profile"
                      checked={true}
                      onChange={() => {}}
                      darkMode={darkMode}
                    />
                    <ToggleSetting
                      label="Show Activity Status"
                      description="Let others see when you're online"
                      checked={true}
                      onChange={() => {}}
                      darkMode={darkMode}
                    />
                    <ToggleSetting
                      label="Data Collection"
                      description="Allow anonymous usage data collection"
                      checked={false}
                      onChange={() => {}}
                      darkMode={darkMode}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-end space-x-3`}>
          <button 
            onClick={onClose} 
            className={`px-6 py-2.5 rounded-lg border transition-colors ${
              darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleSetting({ label, description, checked, onChange, darkMode }: any) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg ${
      darkMode ? 'bg-gray-750' : 'bg-gray-50'
    }`}>
      <div>
        <p className="font-medium">{label}</p>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
      </div>
      <button
        onClick={() => (onChange as (v: boolean) => void)(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-blue-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300')
        }`}
      >
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`} />
      </button>
    </div>
  );
}