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
  <div id="main-content">
    <div id="center-column">
        <table>
            <thead>
                <tr>
                    <th>Center Table 1</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Table content here</td>
                </tr>
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>Center Table 2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Table content here</td>
                </tr>
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>Center Table 3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Table content here</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div id="right-column">
        <table>
            <thead>
                <tr>
                    <th>Right Table 1</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Table content here</td>
                </tr>
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>Right Table 2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Table content here</td>
                </tr>
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>Right Table 3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Table content here</td>
                </tr>
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>Right Table 4</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Table content here</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div id="bottom-table">
    <table>
        <thead>
            <tr>
                <th>Bottom Table</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Table content here</td>
            </tr>
        </tbody>
    </table>
</div>
  <section style={sectionStyle}>
    <h1 style={{textAlign: 'center',}}>Home Page</h1>
    <AnswerComponent content="Some answer content" user="Jane Doe" points={5} answerId={1} />
    <button onClick={handleLogout}>Logout</button>
  </section>
  <footer style={footerStyle}>
  <p>&copy; 2023 TechQ. All rights reserved. <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
  </footer>
  </>
  
)
};

export default Home;
