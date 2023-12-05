import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const sectionStyle = {
  padding: '2%',
  paddingTop: '5%',
  alignItema: 'center',
  maxWidth: '75%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  margin: '0 auto',
};

const Profile = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [newProfileData, setNewProfileData] = useState({


    // Initialize with existing profile data if available
    
    fname: user?.fname || '',
    lname: user?.lname || '',
    username: user?.username || '',
    email: user?.email || '',
    school: user?.school || '',
    languages: user?.languages ? user.languages.join(', ') : '',
    // Add other profile fields as needed
  });

  const [image, setImage] = useState(null); // Add state for image
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
          } else {
            console.log('Document does not exist');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoadingUserData(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

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

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleUpdateProfile = async () => {
    try {
      // Convert the 'languages' string to an array
      const languagesArray = newProfileData.languages
        ? newProfileData.languages.split(',').map((lang) => lang.trim())
        : [];

      const updatedProfileData = {
        fname: newProfileData.fname,
        lname: newProfileData.lname,
        username: newProfileData.username,
        email: newProfileData.email,
        school: newProfileData.school,
        languages: languagesArray,
        // Add other profile fields as needed
      };

      await updateUserProfile(updatedProfileData);

      // After successful update, exit editing mode
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (!image) return;
    const imageRef = ref(storage, `images/${user.uid}/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrl(url);
        const docRef = doc(db, 'users', user.uid);
        updateDoc(docRef, { pic: url });
      });
    });
  };
  

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  return (
    <section style={sectionStyle}>
    <div>
    {user ? (
      <>
        <h2>Welcome, {userData.fname}</h2>
        <div>
      <img src={userData.pic || 'http://via.placeholder.com/100'} alt="Profile" />
      {isEditingProfile && (
            <>
              <input type="file" onChange={handleChange} />
              <button onClick={handleUpload}>Upload Profile Picture</button>
            </>
          )}
    </div>
        {/* Display user data when loaded */}
        {!loadingUserData && (
          <div>
            <p>First Name: {isEditingProfile ? (
  <input
    type="text"
    name="fname"
    value={newProfileData.fname}
    onChange={(e) => {
      const value = e.target.value;
      setNewProfileData((prevData) => ({
        ...prevData,
        [e.target.name]: value !== '' ? value : prevData.fname,
      }));
    }}
  />
) : userData.fname}</p>

<p>Last Name: {isEditingProfile ? (
  <input
    type="text"
    name="lname"
    value={newProfileData.lname}
    onChange={(e) => {
      const value = e.target.value;
      setNewProfileData((prevData) => ({
        ...prevData,
        [e.target.name]: value !== '' ? value : prevData.lname,
      }));
    }}
  />
) : userData.lname}</p>


<p>User Name: {isEditingProfile ? (
  <input
    type="text"
    name="username"
    value={newProfileData.username}
    onChange={(e) => {
      const value = e.target.value;
      setNewProfileData((prevData) => ({
        ...prevData,
        [e.target.name]: value !== '' ? value : prevData.username,
      }));
    }}
  />
) : userData.username}</p>
   

<p>Email: {isEditingProfile ? (
  <input
    type="email"
    name="email"
    value={newProfileData.email}
    onChange={(e) => {
      const value = e.target.value;
      setNewProfileData((prevData) => ({
        ...prevData,
        [e.target.name]: value !== '' ? value : prevData.email,
      }));
    }}
  />
) : userData.email}</p>


<p>School: {isEditingProfile ? (
  <input
    type="text"
    name="school"
    value={newProfileData.school}
    onChange={(e) => {
      const value = e.target.value;
      setNewProfileData((prevData) => ({
        ...prevData,
        [e.target.name]: value !== '' ? value : prevData.school,
      }));
    }}
  />
) : userData.school}</p>

<p>Languages: {isEditingProfile ? (
  <input
    type="text"
    name="languages"
    value={newProfileData.languages}
    onChange={(e) => {
      const value = e.target.value;
      setNewProfileData((prevData) => ({
        ...prevData,
        [e.target.name]: value !== '' ? value : prevData.languages,
      }));
    }}
  />
) : userData.languages ? userData.languages.join(', ') : ''}</p>

            {/* Add other profile fields as needed */}
          </div>
        )}

        {isEditingProfile ? (
          <div>
            <button onClick={handleUpdateProfile}>Update Profile</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleEditProfile}>Edit Profile</button>
        )}

        <button onClick={handleLogout}>Logout</button>
      </>
    ) : (
      <p>You are not logged in</p>
    )}
  </div>  
  </section>);
};

export default Profile;
