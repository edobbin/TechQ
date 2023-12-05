// MyQuestions.js
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import QuestionComponent from './QuestionComponent';

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

const MyQuestions = () => {
  const [userQuestions, setUserQuestions] = useState([]);
  const navigate = useNavigate();

  const fetchUserQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Post'));
      const userQuestionsData = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((question) => question.created_by_user === auth.currentUser.uid);
      setUserQuestions(userQuestionsData);
    } catch (error) {
      console.error('Error fetching user questions:', error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to login if user is not authenticated
        navigate('/');
      }
    });

    fetchUserQuestions();
  }, [navigate]);

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

  const handleAnswerSubmit = async (questionId, answerContent) => {
    try {
      const questionRef = doc(db, 'Post', questionId);
      await updateDoc(questionRef, {
        answers: arrayUnion({
          content: answerContent,
          created_by_user: auth.currentUser.uid,
          date_created: new Date(),
        }),
      });
      console.log('Answer posted successfully');
      // Fetch user questions again to get the updated data
      fetchUserQuestions();
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const questionRef = doc(db, 'Post', questionId);
      await deleteDoc(questionRef);
      console.log('Question deleted successfully');
      // Fetch user questions again to get the updated data
      fetchUserQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
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
    paddingBottom: '90px',
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

  return (
    <>
      <section style={sectionStyle}>
        <h1>My Questions</h1>
        {/* Display User Questions */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {userQuestions.map((question) => (
              <QuestionComponent
                key={question.id}
                question={question}
                answerTextareaValue={''} // Add your state for answers if needed
                setAnswerTextareaValue={() => {}} // Add your state setter if needed
                handleAnswerSubmit={(answerContent) => handleAnswerSubmit(question.id, answerContent)}
                showAnswers={false} // Set to default value for answers dropdown
                toggleAnswers={() => {}} // Add your toggleAnswers function if needed
                selectedQuestion={null} // Add your selectedQuestion state if needed
                handleDeleteQuestion={() => handleDeleteQuestion(question.id)}
              />
            ))}
          </div>
        </div>
      </section>
      <footer style={footerStyle}>
       <p>
          &copy; 2023 TechQ. All rights reserved. <a href="/about">About TechQ</a> |{' '}
          <a href="/contact">Contact Us</a>
        </p>
      </footer>
      {/* Add your footer if needed */}
    </>
  );
};

export default MyQuestions;
