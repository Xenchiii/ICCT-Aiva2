import { useState } from 'react';
import './UserProfileDropdown.css';
import { User, LogOut, ChevronDown } from 'lucide-react';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const email = "jameleague15@gmail.com";

  return (
    <div className="profile-dropdown">
      <div className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
        <div className="avatar">JD</div>
        <ChevronDown size={16} />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="user-info">
            <p className="user-email">{email}</p>
          </div>
          <div className="dropdown-item"><User size={16} /> Profile</div>
          <div className="dropdown-item logout"><LogOut size={16} /> Logout</div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;