import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import './Auth.css';
import Login from './Login';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pic, setUrl] = useState('');

  // Additional state variables for user fields
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [projects, setProjects] = useState([{ title: '', description: '' }]);
  const [workExperience, setWorkExperience] = useState([
    { company: '', role: '', startDate: '', endDate: '' },
  ]);
  const [school, setSchool] = useState('');
  const [languages, setLanguages] = useState([]);

  const validateEmail = (email) => {
    const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexPattern.test(email);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Ensure that passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      // Create user with email and password
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signed in user: ', user);

      // Add user data to Firestore
      try {
        // Set the document ID explicitly as the user UID
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          fname,
          lname,
          email, // This email is the one used for signup
          school,
          languages: languages.split(','), // Assuming languages are entered as a comma-separated list
          username: '', // Add additional fields as required
          points: 0,
          // Include other fields as needed
        });

        // Navigate to user profile or home page after sign-up
        navigate('/profile'); // Adjust the route as needed
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      alert('Error during account creation: ' + errorMessage);
    }
  };

  return (
    <main className='auth'>
      <section>
        <div className="signUpDiv">
          <div>
          <div className='container2'>
          <div className='container'>
            
            <form className='loginform'>
              <div className='headcolor'> TechQ SignUp </div>
              <div className='inside'>
              <div>
                <label htmlFor='email-address'>Email:</label>
                <input
                  type='email'
                  label='Email Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder='Email address'
                />
              </div>

              <div>
                <label htmlFor='username'>Username:</label>
                <input
                  type='username'
                  label='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder='username'
                />
              </div>

              <div>
                <label htmlFor='password'>Password:</label>
                <input
                  type='password'
                  label='Create password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder='Password'
                />
              </div>

              <div>
                <label htmlFor='confirm-password'>Confirm Password:</label>
                <input
                  type='password'
                  label='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder='Confirm Password'
                />
              </div>

              <div>
                <label htmlFor='fname'>First Name:</label>
                <input type='text' value={fname} onChange={(e) => setFname(e.target.value)} required />
              </div>
              <div>
                <label htmlFor='lname'>Last Name:</label>
                <input type='text' value={lname} onChange={(e) => setLname(e.target.value)} required />
              </div>
              <div>
                <label htmlFor='school'>School:</label>
                <input type='text' value={school} onChange={(e) => setSchool(e.target.value)} required />
              </div>
              <div>
                <label htmlFor='languages'>Languages:</label>
                <input type='text' value={languages} onChange={(e) => setLanguages(e.target.value)} required />
              </div>

              <button type='submit' onClick={onSubmit}>
                Sign up
              </button>
              </div>
            </form>

            <p>
              Already have an account?{' '}
              <NavLink to='/'>
                Sign in
              </NavLink>
            </p>
            </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;

// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../firebase';
// import { collection, addDoc } from "firebase/firestore";
// import './Auth.css';
// import Login from './Login';

// const Signup = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [pic, setUrl] = useState('');

//   // Additional state variables for user fields
//   const [fname, setFname] = useState('');
//   const [lname, setLname] = useState('');
//   const [projects, setProjects] = useState([
//     { title: "", description: ""}
//   ]);
//   const [workExperience, setWorkExperience] = useState([
//     { company: "", role: "", startDate: "", endDate: "" }
//   ]);
//   const [school, setSchool] = useState('');
//   const [languages, setLanguages] = useState([]);

//   const validateEmail = (email) => {
//     const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regexPattern.test(email);
//   };
  
//   const onSubmit = async (e) => {
//     e.preventDefault();
  
//     // Ensure that passwords match
//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     if (!validateEmail(email)) {
//       alert("Please enter a valid email address.");
//       return;
//     }
  
//     try {
//       // Create user with email and password
//       const { user } = await createUserWithEmailAndPassword(auth, email, password);
//       console.log("Signed in user: ", user);
  
//       // Add user data to Firestore
//       try {
//         const docRef = await addDoc(collection(db, "users"), {
//           uid: user.uid,
//           fname,
//           lname,
//           email, // This email is the one used for signup
//           school,
//           languages: languages.split(','), // Assuming languages are entered as a comma-separated list
//           username: username, // Add additional fields as required
//           points: 0,
//           // Include other fields as needed
//         });
//         console.log("Document written with ID: ", docRef.id);
  
//         // Navigate to user profile or home page after sign-up
//         navigate("/profile"); // Adjust the route as needed
  
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
 
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error(errorCode, errorMessage);
//       alert("Error during account creation: " + errorMessage);
//     }
//   };

//   return (
//     <main className='auth'>
//       <section>
//         <div>
//           <div>
//             <h1> Sign Up for TechQ </h1>
//             <form>
//               <div>
//                 <label htmlFor="email-address">
//                   Email:
//                 </label>
//                 <input
//                   type="email"
//                   label="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   placeholder="Email address"
//                 />
//               </div>

//               {/* <div>
//                 <label htmlFor="username">First Name:</label>
//                 <input type="text" value={username} onChange={(e) => setUser(e.target.value)} required />
//               </div> */}

//               <div>
//                 <label htmlFor="username">
//                   Username:
//                 </label>
//                 <input
//                   type="username"
//                   label="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                   placeholder="username"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="password">
//                   Password:
//                 </label>
//                 <input
//                   type="password"
//                   label="Create password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   placeholder="Password"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="confirm-password">
//                   Confirm Password:
//                 </label>
//                 <input
//                   type="password"
//                   label="Confirm password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                   placeholder="Confirm Password"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="fname">First Name:</label>
//                 <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} required />
//               </div>
//               <div>
//                 <label htmlFor="lname">Last Name:</label>
//                 <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} required />
//               </div>
//               <div>
//                 <label htmlFor="school">School:</label>
//                 <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} required />
//               </div>
//               <div>
//                 <label htmlFor="languages">Languages:</label>
//                 <input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} required />
//               </div>

//               <button
//                 type="submit"
//                 onClick={onSubmit}
//               >
//                 Sign up
//               </button>
//             </form>

//             <p>
//               Already have an account?{' '}
//               <NavLink to="/" >
//                 Sign in
//               </NavLink>
//             </p>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default Signup;