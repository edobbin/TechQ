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
      <p>Asked by: {question.creator_username}</p>
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