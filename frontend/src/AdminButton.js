// src/AdminButton.js
import React from 'react';
import './AdminButton.css';

const AdminButton = () => {
  return (
    <button
      className="admin-button"
      onClick={() => {
        // Add your navigation logic here
        window.location.href = '/admin'; // Replace '/admin' with the actual admin page URL
      }}
    >
      Access Admin
    </button>
  );
};

export default AdminButton;
