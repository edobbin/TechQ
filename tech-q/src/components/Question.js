import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';
import { db } from "../firebase";
import { auth, storage } from '../firebase';
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import "./Question.css";
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

const Question = () => {
  const [person, loading, error, logout] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');

useEffect(() => {
  if (person) {
    const docRef = doc(db, 'users', person.uid);
    console.log('User ID: ', user.uid)
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('Document Data:', data);
          setUserData(data);
          setFname(data.fname);
          setLname(data.lname);
          setEmail(data.email);
          setUsername(data.username);
          console.log('Retrieved username:', data.username);
          console.log('UserData state:', userData);
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }
}, [person]);

  const { user } = useAuth();
  const navigate = useNavigate();
  const [textareaValue, setTextareaValue] = useState('');

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  const sectionStyle = {
    padding: "2%",
    paddingTop: "5%",
    alignItema: "center",
    maxWidth: "75%",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    margin: "0 auto",
  };

 

  const onSubmit = async (e) => {
    e.preventDefault();
    // Trim the value to remove leading and trailing whitespaces
    const trimmedValue = textareaValue.trim();

    if (!trimmedValue) {
      // Handle the case where the question is empty
      console.error("Question cannot be empty");
      alert("Question cannot be empty.")
      // You can display an error message or prevent the submission
      return;
    }
    if (!user || !user.uid) {
      // Handle the case where the user is not authenticated
      console.error("User not authenticated");
      
      // Redirect to login or handle accordingly
      return;
    }
    
    try {
      // Generate a reference to a new document with an auto-generated ID
      const newQuestionRef = doc(collection(db, 'Post'));
      console.log(username)
      // Use setDoc to explicitly set the document with the generated ID
      await setDoc(newQuestionRef, {
        created_by_user: user.uid,
        creator_username: username,
        content: textareaValue,
        answers: [], // Initialize the answers field as an empty array
        points: 0,
        upvotes: 0,
        downvotes: 0,
        date_created: new Date(),
      });
  
      console.log("Document written with ID: ", newQuestionRef.id);
      alert("Question posted");
      navigate("/home");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  

  return (
    <>
      <section className="content" style={sectionStyle}>
        <h1>Ask a Question</h1>
        <form action="post_question.php" method="POST">
          <label htmlFor="question">Your Question:</label>
          <textarea id="question" name="question" value={textareaValue} onChange={handleTextareaChange} rows="5" required></textarea>
          <button type="submit" onClick={onSubmit}
          style={{marginLeft: '1%',
          backgroundColor: '#6200B3',
          border: 'none',
          color: 'white',
          padding: '10px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          borderRadius: '8px'}}>
            Post Question
          </button>
        </form>
      </section>

      
    </>
  );
};

export default Question;
