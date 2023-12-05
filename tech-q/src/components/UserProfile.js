import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuth } from './contexts/AuthContext';

function UserProfile() {
  const profileStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    padding: '2%',
  };

  const imgStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);

  const [userData, setUserData] = useState({});
  const [image, setImage] = useState(null);
  const [pic, setUrl] = useState('');

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [projects, setProjects] = useState([{ title: "", description: "" }]);
  const [workExperience, setWorkExperience] = useState([{ company: "", role: "", startDate: "", endDate: "" }]);
  const [school, setSchool] = useState('');
  const [languages, setLanguages] = useState([]);
  const [email, setEmail] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [skills, setSkills] = useState([]);
  const [profileEditMode, setProfileEditMode] = useState(false);

  const [updatedFname, setUpdatedFname] = useState('');
  const [updatedLname, setUpdatedLname] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  const { updateUserProfile } = useAuth();


  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const fetchData = async () => {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setFname(data.fname);
            setLname(data.lname);
            setEmail(data.email);
            setProjects(data.projects || []);
            setWorkExperience(data.workExperience || []);
            setSchool(data.school);
            setLanguages(data.languages || []);
            setSkills(data.skills);
            setUrl(data.pic);
          } else {
            console.log('Document does not exist');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  

  const saveProfile = () => {
    const docRef = doc(db, 'users', user.uid);
    updateDoc(docRef, {
      fname,
      lname,
      email,
      projects,
      workExperience,
      school,
      languages,
      skills,
      pic,
    }).then(() => {
      setProfileEditMode(false);
    });
  };

// New function to handle profile update
const handleUpdateProfile = async () => {
  try {
    const docRef = doc(db, 'users', user.uid);
    await updateDoc(docRef, {
      fname: updatedFname,
      lname: updatedLname,
      email: updatedEmail,
      // Add other fields as needed
    });

    // Fetch updated user data and update the state
    const updatedDocSnap = await getDoc(docRef);
    if (updatedDocSnap.exists()) {
      const updatedData = updatedDocSnap.data();
      setUserData(updatedData);
      setFname(updatedData.fname);
      setLname(updatedData.lname);
      setEmail(updatedData.email);
      setProjects(updatedData.projects || []);
      setWorkExperience(updatedData.workExperience || []);
      setSchool(updatedData.school);
      setLanguages(updatedData.languages || []);
      setSkills(updatedData.skills);
      setUrl(updatedData.pic);
    } else {
      console.log('Document does not exist');
    }

    // Call updateUserProfile from useAuth to update the user profile
    updateUserProfile({
      fname: updatedFname,
      lname: updatedLname,
      email: updatedEmail,
      // Add other fields as needed
    });

    setProfileEditMode(false); // Exit edit mode after saving
  } catch (error) {
    console.error('Error updating profile:', error.message);
    // Handle error, e.g., display an error message to the user
  }
};
  const saveAboutMe = () => {
    const docRef = doc(db, 'users', user.uid);
    updateDoc(docRef, { aboutMe }).then(() => {
      setProfileEditMode(false);
    });
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

  const toggleProfileEditMode = () => {
    setProfileEditMode(!profileEditMode);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>User is not authenticated</p>;

  return (
    <div className="UserProfile" style={profileStyle}>
      <div className="UserProfileRow UserProfileHeader">
        <div className="UserProfileImage">
          <img src={pic || 'http://via.placeholder.com/100'} style={imgStyle} alt="Profile" />
        </div>
        <h4>YOUR Email: {user.email}</h4>
        <div className="UserProfileInfo">
          <p>Name: {fname} {lname}</p>
          <p>School: {school}</p>
          <p>Languages: {languages}</p>
          <p>Rank: {userData.rank}</p>
          <p>Solved: {userData.solved}</p>
          <button onClick={handleLogout}>Logout</button>
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
            {/* New input fields for profile update */}
          <label>First Name:</label>
          <input type="text" value={updatedFname} onChange={(e) => setUpdatedFname(e.target.value)} />

          <label>Last Name:</label>
          <input type="text" value={updatedLname} onChange={(e) => setUpdatedLname(e.target.value)} />

          <label>Email:</label>
          <input type="email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />

          {/* Button to trigger profile update */}
          <button onClick={handleUpdateProfile}>Update Profile</button>
            <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
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
