import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './UserIcon.css'; // Optional: for styling

function UserIcon() {
  return (
    <div className="user-icon">
      <Link to="/user">
        <FaUserCircle size={30} />
      </Link>
    </div>
  );
}

export default UserIcon;
