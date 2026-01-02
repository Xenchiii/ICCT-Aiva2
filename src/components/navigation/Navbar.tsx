import React from 'react';
import './Navbar.css';
import ThemeSwitcher from './ThemeSwitcher';
import NotificationCenter from './NotificationCenter';
import UserProfileDropdown from './UserProfileDropdown';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-search">
        <input type="text" placeholder="Search courses..." />
      </div>
      <div className="navbar-actions">
        <ThemeSwitcher />
        <NotificationCenter />
        <UserProfileDropdown />
      </div>
    </nav>
  );
};

export default Navbar;