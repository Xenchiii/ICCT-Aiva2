import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modules from './Modules';
import Announcements from './Announcements';
import Assignment from './Assignment';
import Gradebook from './Gradebook';
import './CourseDetails.css';

const CourseDetails = () => {
   const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('modules');

  // Hardcoded Course Info
  const course = { code: 'IT 302', title: 'Web Development' };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <button onClick={() => navigate('/courses')} className="text-sm text-gray-500 hover:text-primary mb-2">← Back to Courses</button>
        <h1 className="text-3xl font-black text-gray-900">{course.code} - {course.title}</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 flex gap-6 overflow-x-auto">
        {['modules', 'announcements', 'assignments', 'grades'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 px-2 capitalize text-sm text-gray-500 hover:text-primary transition ${activeTab === tab ? 'active-tab' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-6 max-w-5xl mx-auto">
        {activeTab === 'modules' && <Modules />}
        {activeTab === 'announcements' && <Announcements />}
        {activeTab === 'assignments' && <Assignment />}
        {activeTab === 'grades' && <Gradebook />}
      </div>
    </div>
  );
};

export default CourseDetails;