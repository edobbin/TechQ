import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Auth.css'
import Signup from './Signup';
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
              <h1>TechQ Login</h1>
              <form>
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
              </form>
              <p className="text-sm text-white text-center">
                No account yet?{' '}
                <NavLink to="/signup">
                  Sign up
                </NavLink>
              </p>
            </div>
          </section>
        </main>
      </>
    );
  };
  
  export default Login;
// const Login = () => {

    
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
       
//     const onLogin = (e) => {
//         e.preventDefault();
//         signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             navigate("/home")
//             console.log(user);
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(errorCode, errorMessage)
//         });
       
//     }
 
//     return(
//         <>
//             <main>        
//                 <section>
//                     <div>                                            
//                         <h1>TechQ Login</h1>                       
                                            
//                         <form>                                              
//                             <div>
//                                 <label htmlFor="email-address">
//                                     Email: 
//                                 </label>
//                                 <input
//                                     id="email-address"
//                                     name="email"
//                                     type="email"                                    
//                                     required                                                                                
//                                     placeholder="Email Address"
//                                     onChange={(e)=>setEmail(e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="password">
//                                     Password:
//                                 </label>
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type="password"                                    
//                                     required                                                                                
//                                     placeholder="Password"
//                                     onChange={(e)=>setPassword(e.target.value)}
//                                 />
//                             </div>
                                                
//                             <div>
//                                 <button                                    
//                                     onClick={onLogin}                                        
//                                 >      
//                                     Login                                                                  
//                                 </button>
//                             </div>                               
//                         </form>
                       
//                         <p className="text-sm text-white text-center">
//                             No account yet? {' '}
//                             <NavLink to="/signup">
//                                 Sign up
//                             </NavLink>
//                         </p>
                                                   
//                     </div>
//                 </section>
//             </main>
//         </>
//     )
// }
 
// export default Login

// // Login.js
// import React, { useState } from 'react';
// import { auth } from '../firebase';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await auth.signInWithEmailAndPassword(email, password);
//       console.log('User logged in successfully!');
//     } catch (error) {
//       console.error('Error logging in', error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <button type="submit">Log In</button>
//       </form>
//     </div>
//   );
// };

// export default Login;