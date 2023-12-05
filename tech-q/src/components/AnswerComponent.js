// AnswerComponent.js
import React from 'react';

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

const AnswerComponent = ({ answers }) => {
  if (!answers || answers.length === 0) {
    return <p>No answers yet.</p>;
  }

  return (
    <div>
      <h4>Answers:</h4>
      {answers.map((answer, index) => (
        <div key={index} style={{ border: '2px solid #ddd', padding: '5px', margin: '5px 0', backgroundColor: '#FFFFFF', borderRadius: '8px'}}>
          <h3>Answer: </h3>
          <p>{answer.content}</p>
          <p style={{textIndent: '20px', fontSize: '0.85em', color: '#616161'}}><em>Answered by:</em> {answer.creator_username}</p>
          <p style={{textIndent: '20px', fontSize: '0.85em', color: '#616161'}}><em>Date posted:</em> {formatDate(answer.date_created?.toDate())}</p>
        </div>
      ))}
    </div>
  );
};

export default AnswerComponent;