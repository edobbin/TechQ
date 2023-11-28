import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function UserProfile() {
  // State variables
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [aboutMe, setAboutMe] = useState('');
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  // Fetch user data from Firestore on component mount
  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setAboutMe(docSnap.data().aboutMe);
          setUrl(docSnap.data().profileImageUrl);
        }
      });
    }
  }, [user]);

  // Handler for changes in the 'About Me' section
  const handleAboutMeChange = (e) => {
    setAboutMe(e.target.value);
  };

  // Save the 'About Me' section to Firestore
  const saveAboutMe = () => {
    const docRef = doc(db, 'users', user.uid);
    updateDoc(docRef, { aboutMe }).then(() => {
      setProfileEditMode(false); // Exit edit mode after saving
    });
  };

  // Handler for file input change
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Upload image to Firebase Storage and get the URL
  const handleUpload = () => {
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrl(url);
      });
    });
  };

  // Toggle between view and edit mode
  const toggleProfileEditMode = () => {
    setProfileEditMode(!profileEditMode);
  };

  // Render component
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>User is not authenticated</p>;

  return (
    <div className="UserProfile">
      <div className="UserProfileRow UserProfileHeader">
        <div className="UserProfileImage">
          <img src={url || 'http://via.placeholder.com/100'} alt="Profile" />
        </div>
        <div className="UserProfileInfo">
          <p>Rank: {userData.rank}</p>
          <p>Solved: {userData.solved}</p>
        </div>
      </div>

      {user && user.uid === userData.uid && (
        <button onClick={toggleProfileEditMode}>
          {profileEditMode ? 'View Profile' : 'Edit Profile'}
        </button>
      )}

      <div className="UserProfileRow UserProfileBody">
        {profileEditMode ? (
          <>
            <textarea value={aboutMe} onChange={handleAboutMeChange} />
            <button onClick={saveAboutMe}>Save</button>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload Image</button>
          </>
        ) : (
          <>
            <p>{aboutMe}</p>
            {/* Display additional non-editable user information here */}
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;