import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Answer from './AnswerComponent'; // Adjust the import path as needed
import { auth } from '../firebase'; // Import Firebase auth

const AnswerSubmitComponent = ({ questionId, onAnswerSubmit }) => {
  const [answerText, setAnswerText] = useState('');
  const [creatorUserId, setCreatorUserId] = useState(null);
  //const navigate = useNavigate();

  useEffect(() => {
    // Set the creator user ID to the current user's ID
    if (auth.currentUser) {
      setCreatorUserId(auth.currentUser.uid);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the creator user ID is available
    if (!creatorUserId) {
      console.error("No user ID found");
      return;
    }

    // Create a new Answer object
    const newAnswer = new Answer(
      answerText,
      creatorUserId,
      questionId,
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    );

    // Save the new answer and navigate back
    try {
        await newAnswer.save();
        if (this.props.onAnswerSubmit) {
            this.props.onAnswerSubmit(newAnswer);
        }
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