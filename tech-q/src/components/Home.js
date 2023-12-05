// Home.js
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, arrayUnion, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import QuestionComponent from './QuestionComponent';
import { useAuthState } from 'react-firebase-hooks/auth';
import profilecard from './Profile_Card';

// function formatDate(date) {
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   return new Date(date).toLocaleDateString(undefined, options);
// }

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [answerTextareaValues, setAnswerTextareaValues] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const navigate = useNavigate();

  const [person, loading, error, logout] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');

useEffect(() => {
  if (person) {
    const docRef = doc(db, 'users', person.uid);
    // console.log('User ID: ', user.uid)
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('Document Data:', data);
          setUserData(data);
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

  const initialValues = questions.reduce((acc, question) => {
    acc[question.id] = '';
    return acc;
  }, {});
  setAnswerTextareaValues(initialValues);
}, [person, questions]);

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
        const uid = user.uid;
        console.log('uid', uid);
      } else {
        console.log('user is logged out');
      }
    });

    fetchQuestions();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
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
          content: answerTextareaValues[questionId],
          created_by_user: auth.currentUser.uid,
          creator_username: username,
          date_created: new Date(),
        }),
      });
      // Clear the text area value for the submitted question
      setAnswerTextareaValues((prevValues) => ({
        ...prevValues,
        [questionId]: '',
      }));
      console.log('Answer posted successfully');
      alert('Answer posted!');
      fetchQuestions();
      setShowAnswers(true);
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };

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
  };

    const buttonStyle = {
    marginLeft: '1%',
    backgroundColor: '#6200B3',
    border: 'none',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '8px'
  }

  const handleDeleteQuestion = async (questionId) => {
    try {
      const questionRef = doc(db, 'Post', questionId);
      const questionSnapshot = await getDoc(questionRef);

      // Check if the user deleting the question is the one who created it
      if (questionSnapshot.exists() && questionSnapshot.data().created_by_user === auth.currentUser.uid) {
        await deleteDoc(questionRef);
        console.log('Question deleted successfully');
        alert('Question deleted!');
        // Fetch questions again to get the updated data
        fetchQuestions();
      } else {
        console.log('User does not have permission to delete this question');
        alert('You do not have permission to delete this question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };


  const toggleAnswers = (questionId) => {
    setShowAnswers(!showAnswers);
    setSelectedQuestion(questionId);
  };

  return (
    <>
   
      <section style={sectionStyle}>
      <h1>All Questions Posted</h1>
        <div style={{ paddingBottom: '10%' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {questions.map((question) => (
              <QuestionComponent
                key={question.id}
                question={question}
                answerTextareaValue={answerTextareaValues[question.id]}
                setAnswerTextareaValue={(value) =>
                  setAnswerTextareaValues((prevValues) => ({
                    ...prevValues,
                    [question.id]: value,
                  }))
                }
                handleAnswerSubmit={handleAnswerSubmit}
                showAnswers={showAnswers}
                toggleAnswers={toggleAnswers}
                selectedQuestion={selectedQuestion}
                handleDeleteQuestion={handleDeleteQuestion}
              />
            ))}
          </div>
        </div>
      </section>
      
    </>
  );
};

export default Home;