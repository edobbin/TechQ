import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import './Auth.css';
import Login from './Login';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  
  const onSubmit = async (e) => {
    e.preventDefault();

    // ensure that passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      // Signed in
      
      console.log(user);


try {
  const docRef = await addDoc(collection(db, "users"), {
    id: user.uid ,
    username: username,
    points: 0,
    upvotes: 0,
    downvotes: 0,
    
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

      alert("Account creation successful! Please sign in.");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  };

  return (
    <main className='auth'>
      <section>
        <div>
          <div>
            <h1> Sign Up for TechQ </h1>
            <form>
              <div>
                <label htmlFor="email-address">
                  Email:
                </label>
                <input
                  type="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="username">
                  Username:
                </label>
                <input
                  type="username"
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="username"
                />
              </div>

              <div>
                <label htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              <div>
                <label htmlFor="confirm-password">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  label="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Password"
                />
              </div>

              <button
                type="submit"
                onClick={onSubmit}
              >
                Sign up
              </button>
            </form>

            <p>
              Already have an account?{' '}
              <NavLink to="/" >
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;