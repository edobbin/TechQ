import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Call the logout function from the context to update the state
      logout();
      // Navigate to the login page after logout
      navigate('/');
    } catch (error) {
      console.error('Error logging out', error.message);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
};

export default Profile;
