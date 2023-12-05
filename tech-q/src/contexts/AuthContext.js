import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { auth } from '../firebase'; // Adjust the path based on your file structure

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = async (newProfileData) => {
    try {
      const { uid } = user;
      const userDocRef = doc(getFirestore(), 'users', uid);
      await updateDoc(userDocRef, newProfileData);

      setUser((userData) => ({
        ...userData,
        ...newProfileData,
      }));

      console.log('User profile updated successfully:', newProfileData);
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
