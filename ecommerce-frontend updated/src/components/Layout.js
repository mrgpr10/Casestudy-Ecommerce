// src/components/Layout.js
import React from 'react';
import UserIcon from './UserIcon';

function Layout({ children }) {
  return (
    <div>
      <UserIcon />
      {children}
    </div>
  );
}

export default Layout;
