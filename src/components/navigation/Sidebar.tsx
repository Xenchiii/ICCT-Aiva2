import { useState } from 'react';
import './Sidebar.css';
import { LayoutDashboard, BookOpen, GraduationCap, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <span className="logo-text">GradeMaster PH</span>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="toggle-btn">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-item active"><LayoutDashboard size={20} /> {!isCollapsed && <span>Dashboard</span>}</div>
        <div className="nav-item"><BookOpen size={20} /> {!isCollapsed && <span>Subjects</span>}</div>
        <div className="nav-item"><GraduationCap size={20} /> {!isCollapsed && <span>GWA Calculator</span>}</div>
        <div className="nav-item mt-auto"><Settings size={20} /> {!isCollapsed && <span>Settings</span>}</div>
      </nav>
    </aside>
  );
};

export default Sidebar;