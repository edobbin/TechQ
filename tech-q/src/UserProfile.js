import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function UserProfile() {
  // State variables
  const [user, loading, error] = useAuthState(auth);
  
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState(null);
  const [pic, setUrl] = useState('');

  // Additional state variables for user fields
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [projects, setProjects] = useState([
    { title: "", description: ""}
  ]);
  const [workExperience, setWorkExperience] = useState([
    { company: "", role: "", startDate: "", endDate: "" }
  ]);
  const [school, setSchool] = useState('');
  const [languages, setLanguages] = useState([]);
  const [email, setEmail] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [skills, setSkills] = useState([]);
  const [profileEditMode, setProfileEditMode] = useState(false);


  // Fetch user data from Firestore on component mount
  // Fetch user data from Firestore on component mount
  useEffect(() => {
    if (user) {
        // Fetch data from Firestore based on the logged-in user's UID
      const docRef = doc(db, 'users', user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setFname(data.fname); // Update based on actual data structure
          setLname(data.lname);
          setEmail(data.email);
          setProjects(data.projects || []);
          setWorkExperience(data.workExperience || []);
          setSchool(data.school);
          setLanguages(data.languages || []);
          setSkills(data.skills)
          setUrl(data.pic); // Assuming 'picture' is the field name for the profile image
          console.log(userData);
        }
      });
    }
  }, [user]);

 // Handler functions for each field
    const handleFnameChange = (e) => {
        setFname(e.target.value);
    };

    const handleLnameChange = (e) => {
        setLname(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };

    const handleProjectsChange = (e) => {
        setProjects(e.target.value);
    }

    const handleWorkExperienceChange = (e) => {
        setWorkExperience(e.target.value)
    }
    const handleSchoolChange = (e) => {
        setSchool(e.target.value)
    }
    const handleLanguagesChange = (e) => {
        setLanguages(e.target.value);
    }
    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    }
  // Handler for changes in the 'About Me' section
  const handleAboutMeChange = (e) => {
    setAboutMe(e.target.value);
  };

  // Save the updated user profile to Firestore

  const saveProfile = () => {
    const docRef = doc(db, 'users', user.uid);
    updateDoc(docRef, {
        // Update with all fields
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
            setProfileEditMode(false); // Exit edit mode after saving
        });
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
    if (!image) return; // Make sure there's an image to upload

    const imageRef = ref(storage, `images/${user.uid}/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
        setUrl(url);
        const docRef = doc(db, 'users', user.uid);
        updateDoc(docRef, { pic: url }); // Update the 'pic' field in Firestore
        });
    });
}

    // Toggle between view and edit mode
    const toggleProfileEditMode = () => {
        setProfileEditMode(!profileEditMode);
      };
    
    // Render component
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!user) return <p>User is not authenticated</p>;

    return (
    <>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!user && <p>User is not authenticated</p>}
    
        {user && (
        <div className="UserProfile">
            <div className="UserProfileRow UserProfileHeader">
                <div className="UserProfileImage">
                <img src={pic || 'http://via.placeholder.com/100'} alt="Profile" />
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
        )}
    </>
    );
};



export default UserProfile;