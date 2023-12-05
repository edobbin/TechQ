import React, { useContext, createContext, useState } from 'react';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = async (newProfileData) => {
    try {
      // Assume 'user' contains the user object with 'uid' property
      const { uid } = user;

      // Create a reference to the user's document in the Firestore 'users' collection
      const userDocRef = doc(getFirestore(), 'users', uid);

      // Update the document with the new profile data
      await updateDoc(userDocRef, newProfileData);

      // Assuming 'setUser' is a function to update the user state
      setUser((userData) => ({
        ...userData,
        ...newProfileData,
      }));

      console.log('User profile updated successfully:', newProfileData);
    } catch (error) {
      console.error('Error updating user profile:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
