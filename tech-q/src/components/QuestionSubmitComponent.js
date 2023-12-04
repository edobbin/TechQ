import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from './QuestionComponent'; // Adjust the import path as needed
import { auth } from '../firebase'; // Import Firebase auth

const QuestionSubmitComponent = ({ onQuestionSubmit }) => {
  const [questionText, setQuestionText] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [languages, setLanguages] = useState('');
  const [tools, setTools] = useState('');
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

    const newQuestion = new Question(
      additionalInfo,
      creatorUserId,
      languages.split(','), // Assuming languages are entered as comma-separated values
      questionText,
      tools.split(','), // Assuming tools are entered as comma-separated values
      new Date().toDateString(),
      new Date().toLocaleTimeString()
    );

    try {
        await newQuestion.save();
        if (onQuestionSubmit) {
          onQuestionSubmit(newQuestion);
        }
      } catch (error) {
        console.error("Error saving the question: ", error);
      }
  };

  return (
    <div className="question-submit-component">
      <form onSubmit={handleSubmit}>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Write your question here"
          required
        />
        <input
          type="text"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Additional information"
        />
        <input
          type="text"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          placeholder="Languages (comma-separated)"
        />
        <input
          type="text"
          value={tools}
          onChange={(e) => setTools(e.target.value)}
          placeholder="Tools (comma-separated)"
        />
        <button type="submit">Post Question</button>
      </form>
    </div>
  );
};

export default QuestionSubmitComponent;