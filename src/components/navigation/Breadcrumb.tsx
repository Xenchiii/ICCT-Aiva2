import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  
  // 1. Split the URL into segments (e.g., "dashboard", "grades")
  const pathnames = location.pathname.split('/').filter((x) => x);

  // 2. Map for custom readable names (Optional)
  const routeNameMap: Record<string, string> = {
    dashboard: 'Dashboard',
    courses: 'My Courses',
    grades: 'Gradebook',
    inquiries: 'Support Tickets',
    profile: 'Student Profile',
    settings: 'Account Settings'
  };

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-container">
      <ol className="breadcrumb-list">
        {/* Home Link (Always visible) */}
        <li className="breadcrumb-item">
          <Link to="/dashboard" className="breadcrumb-link home-icon">
            <Home size={16} />
          </Link>
        </li>

        {/* Dynamic Segments */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          // Use mapped name or capitalize the URL segment
          const displayName = routeNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <React.Fragment key={to}>
              <li className="breadcrumb-separator">
                <ChevronRight size={14} />
              </li>
              <li className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
                {isLast ? (
                  <span aria-current="page">{displayName}</span>
                ) : (
                  <Link to={to} className="breadcrumb-link">
                    {displayName}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;