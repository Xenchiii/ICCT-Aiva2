import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Save } from 'lucide-react';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    maintenance: false,
    registration: true,
    notifications: true
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-black text-primary mb-6">System Configuration</h2>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-gray-800">Maintenance Mode</h4>
            <p className="text-xs text-gray-500">Disable access for all non-admin users</p>
          </div>
          <button onClick={() => toggle('maintenance')} className={`text-4xl ${settings.maintenance ? 'text-green-500' : 'text-gray-300'}`}>
            {settings.maintenance ? <ToggleRight /> : <ToggleLeft />}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-gray-800">Allow New Registrations</h4>
            <p className="text-xs text-gray-500">Students can create new accounts</p>
          </div>
          <button onClick={() => toggle('registration')} className={`text-4xl ${settings.registration ? 'text-green-500' : 'text-gray-300'}`}>
            {settings.registration ? <ToggleRight /> : <ToggleLeft />}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-gray-800">System Notifications</h4>
            <p className="text-xs text-gray-500">Send email alerts for critical events</p>
          </div>
          <button onClick={() => toggle('notifications')} className={`text-4xl ${settings.notifications ? 'text-green-500' : 'text-gray-300'}`}>
            {settings.notifications ? <ToggleRight /> : <ToggleLeft />}
          </button>
        </div>
      </div>

      <button className="w-full mt-8 bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
        <Save size={18} /> Save Changes
      </button>
    </div>
  );
};

export default SystemSettings;