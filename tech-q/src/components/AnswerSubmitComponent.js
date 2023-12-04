import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Answer from './AnswerComponent';
import { auth } from '../firebase'; // Import Firebase auth

const AnswerSubmitComponent = ({ questionId }) => {
  const [answerText, setAnswerText] = useState('');
  const [creatorUserId, setCreatorUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      setCreatorUserId(auth.currentUser.uid);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!creatorUserId) {
      console.error("No user ID found");
      return;
    }

    const newAnswer = new Answer(answerText, creatorUserId, questionId);

    try {
      await newAnswer.save();
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error("Error saving the answer: ", error);
    }
  };

  return (
    <div className="answer-submit-component">
      <form onSubmit={handleSubmit}>
        <textarea 
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Write your answer here"
          required
        />
        <button type="submit">Post Answer</button>
      </form>
    </div>
  );
};

export default AnswerSubmitComponent;