import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Auth.css'
import Signup from './Signup';
import Navbar from './Navbar'
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook
 

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from the context
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const onLogin = async (e) => {
      e.preventDefault();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Set the user in the context
        login(user);
  
        // Redirect to home or another page
        navigate('/home');
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    };
  
    return (
      <>
        <main className="auth">
        
          <section>
            <div>
              
              <form>
                <h1>TechQ Login</h1>
                <div>
                  <label htmlFor="email-address">Email: </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password">Password: </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button onClick={onLogin}>Login</button>
                </div>
              
              <p className="text-sm text-white text-center">
                No account yet?{' '}
                <NavLink to="/signup">
                  Sign up
                </NavLink>
              </p>
              </form>
            </div>
          </section>
        </main>
      </>
    );
  };
  
export default Login;
