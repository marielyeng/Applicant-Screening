import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem('jwtToken');

    // Optionally clear any other user-related state or data

    // Redirect to the login page
    navigate('/admin-login');
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default AdminLogout;
