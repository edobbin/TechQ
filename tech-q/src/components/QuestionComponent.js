// QuestionComponent.js
import React, { useState } from 'react';
import AnswerComponent from './AnswerComponent';
import { auth } from '../firebase';

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

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

const QuestionComponent = ({
  question,
  answerTextareaValue,
  setAnswerTextareaValue,
  handleAnswerSubmit,
  showAnswers,
  toggleAnswers,
  selectedQuestion,
  handleDeleteQuestion,
}) => {
  return (
    <div
      key={question.id}
      style={{
        marginBottom: '20px',
        border: '2px solid #848385',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: '#ded8e8'
      }}
    >
      <h3>{question.content}</h3>
      <p>Created by: {question.created_by_user}</p>
      <p>Date posted: {formatDate(question.date_created?.toDate())}</p>

      {/* Display other details of the question */}
      {showAnswers && selectedQuestion === question.id && (
        <AnswerComponent answers={question.answers} />
      )}

      <textarea
        value={answerTextareaValue}
        onChange={(e) => setAnswerTextareaValue(e.target.value)}
        placeholder="Your Answer"
        style={{ maxWidth: '98%' }}
      />
      <button onClick={() => handleAnswerSubmit(question.id)} style={buttonStyle}>Post Answer</button>
    
      {/* Button to toggle answers dropdown */}
      <button onClick={() => toggleAnswers(question.id)} style={buttonStyle}>
        {showAnswers && selectedQuestion === question.id ? 'Hide Answers' : 'Show Answers'}
      </button>

      {/* New button to delete the question */}
      {/* <button onClick={() => handleDeleteQuestion(question.id)}>Delete Question</button> */}

      {/* Conditionally render delete button based on user */}
      {question.created_by_user === auth.currentUser.uid && (
        <button onClick={() => handleDeleteQuestion(question.id)}
          style={{
            float: 'right',
            backgroundColor: '#FFFFFF',
            border: '2px solid red',
            color: 'red',
            padding: '10px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            borderRadius: '8px'}}
        >
          Delete Question
        </button>
      )}
    </div>
  );
};

export default QuestionComponent;


// import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
// import { db } from './firebase'; // Adjust the import path as per your project structure

// class Question {
//   constructor(additional_info, creator_user_ID, languages, question, tools, date, time) {
//     this.additional_info = additional_info;
//     this.creator_user_ID = creator_user_ID;
//     this.languages = languages; 
//     this.question = question;
//     this.tools = tools;
//     this.created_date_time = { date, time };
//     this.question_ID = null; // Will be set after saving the document
//   }

//   generateQuestionID() {
//     // Generate a unique question ID
//     return new Date().getTime().toString();
//   }

//   async save() {
//     try {
//       const docRef = await addDoc(collection(db, "questions"), this);
//       this.question_ID = docRef.id;
//       console.log("Question saved with ID: ", docRef.id);
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   }

//   async delete() {
//     if (!this.question_ID) {
//       console.error("Error: No ID found for this question.");
//       return;
//     }

//     try {
//       await deleteDoc(doc(db, "questions", this.question_ID));
//       console.log("Question deleted with ID: ", this.question_ID);
//       // To remove the object, you can set it to null in the component where it's being used
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   }
// }

// export default Question;

// // How to use the class
// // import Question from './Question';

// // Assuming you have created and saved a question
// // const newQuestion = new Question(/* parameters */);
// // await newQuestion.save();

// // When you need to delete the question
// // await newQuestion.delete();