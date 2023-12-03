// Home.js
import React, { useEffect } from 'react';
import AnswerComponent from './AnswerComponent'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log("uid", uid)
        } else {
          // User is signed out
          console.log("user is logged out")
        }
      });
  }, [])

  const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

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

  const footerStyle = {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    backgroundColor: '#6200B3',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 0',
    marginTop: 'auto',
  }

return (
  <>
  <section style={sectionStyle}>
    <h1 style={{textAlign: 'center',}}>Home Page</h1>
    <button onClick={handleLogout}>Logout</button>
  </section>
  <footer style={footerStyle}>
  <p>&copy; 2023 TechQ. All rights reserved. <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
  </footer>
  </>
  
)
};

export default Home;
