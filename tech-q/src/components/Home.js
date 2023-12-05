import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import AnswerComponent from './AnswerComponent';

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [answerTextareaValue, setAnswerTextareaValue] = useState('');
  const navigate = useNavigate();
  
  const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Post'));
      const questionData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionData);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log('uid', uid);
      } else {
        // User is signed out
        console.log('user is logged out');
      }
    });

    

    fetchQuestions();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleAnswerSubmit = async (questionId) => {
    try {
      const questionRef = doc(db, 'Post', questionId);
      await updateDoc(questionRef, {
        answers: arrayUnion({
          content: answerTextareaValue,
          created_by_user: auth.currentUser.uid,
          date_created: new Date(),
        }),
      });
      setAnswerTextareaValue('');
      console.log('Answer posted successfully');
      // You may want to fetch questions again to get the updated data
      fetchQuestions();
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };

  return (
    <>
      <section>
        <h1>Home Page</h1>
        <button onClick={handleLogout}>Logout</button>

        {/* Display Questions */}
        <div>
          <h2>All Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {questions.map((question) => (
              <div
                key={question.id}
                style={{
                  marginBottom: '20px',
                  border: '1px solid #ddd',
                  padding: '10px',
                }}
              >
                <h3>{question.content}</h3>
                <p>Created by: {question.created_by_user}</p>
                <p>Date posted: {formatDate(question.date_created?.toDate())}</p>
                <AnswerComponent answers={question.answers} />
                <textarea
                  value={answerTextareaValue}
                  onChange={(e) => setAnswerTextareaValue(e.target.value)}
                  placeholder="Your Answer"
                />
                <button onClick={() => handleAnswerSubmit(question.id)}>Post Answer</button>
                {/* Display other details of the question */}
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer>
        <p>
          &copy; 2023 TechQ. All rights reserved. <a href="/privacy">Privacy Policy</a> |{' '}
          <a href="/terms">Terms of Service</a>
        </p>
      </footer>
    </>
  );
};

export default Home;



// // Home.js
// import React, { useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase';
// import { signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebase';


// function formatDate(date) {
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   return new Date(date).toLocaleDateString(undefined, options);
// }


// const Home = () => {
//   const [questions, setQuestions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;
//         console.log('uid', uid);
//       } else {
//         // User is signed out
//         console.log('user is logged out');
//       }
//     });

//     const fetchQuestions = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'Post'));
//         const questionData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setQuestions(questionData);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         // Sign-out successful.
//         navigate('/');
//         console.log('Signed out successfully');
//       })
//       .catch((error) => {
//         // An error happened.
//       });
//   };

//   const sectionStyle = {
//     padding: '2%',
//     paddingTop: '5%',
//     alignItema: 'center',
//     maxWidth: '75%',
//     display: 'flex',
//     flexDirection: 'column',
//     textAlign: 'left',
//     margin: '0 auto',
//   };

//   const footerStyle = {
//     position: 'fixed',
//     bottom: '0',
//     width: '100%',
//     backgroundColor: '#6200B3',
//     color: '#fff',
//     textAlign: 'center',
//     padding: '10px 0',
//     marginTop: 'auto',
//   };

//   return (
//     <>
//       <section style={sectionStyle}>
//         <h1 style={{ textAlign: 'center' }}>Home Page</h1>
//         <button onClick={handleLogout}>Logout</button>

//         {/* Display Questions */}
//         <div>
//           <h2>All Questions</h2>
//           <div style={{ display: 'flex', flexDirection: 'column' }}>
//             {questions.map((question) => (
//               <div
//                 key={question.id}
//                 style={{
//                   marginBottom: '20px',
//                   border: '1px solid #ddd',
//                   padding: '10px',
//                 }}
//               >
//                 <h3>{question.content}</h3>
//                 <p>Created by: {question.created_by_user}</p>
//                 <p>Date posted: {formatDate(question.date_created.toDate())}</p>
//                 {/* Display other details of the question */}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <footer style={footerStyle}>
//         <p>
//           &copy; 2023 TechQ. All rights reserved. <a href="/privacy">Privacy Policy</a> |{' '}
//           <a href="/terms">Terms of Service</a>
//         </p>
//       </footer>
//     </>
//   );
// };

// export default Home;