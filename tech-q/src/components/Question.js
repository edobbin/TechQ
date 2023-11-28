import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { getFirestore } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';
import { db } from "../firebase";
import { collection, addDoc, doc } from "firebase/firestore";
import "./Question.css";

const Question = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [textareaValue, setTextareaValue] = useState('');

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  const sectionStyle = {
    padding: "2%",
    paddingTop: "5%",
    alignItema: "center",
    maxWidth: "75%",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    margin: "0 auto",
  };

  const footerStyle = {
    position: "fixed",
    bottom: "0",
    width: "100%",
    backgroundColor: "#6200B3",
    color: "#fff",
    textAlign: "center",
    padding: "10px 0",
    marginTop: "auto",
  };

  const onSubmit = async (e) => {
    e.preventDefault();

try {
  const docRef = await addDoc(collection(db, "Post"), {
    created_by_user: user.uid,
    questionID: db.collection(),
    content: textareaValue.value,
    points: 0,
    upvotes: 0,
    downvotes: 0,
    date_created: Date(),
  });
  console.log("Document written with ID: ", docRef.id);
  alert("Question posted");
     // navigate("/");
} catch (e) {
  console.error("Error adding document: ", e);
}

      
  };

  return (
    <>
      <section className="content" style={sectionStyle}>
        <h1>Ask a Question</h1>
        <form action="post_question.php" method="POST">
          <label htmlFor="question">Your Question:</label>
          <textarea id="question" name="question" value={textareaValue} onChange={handleTextareaChange} rows="5" required></textarea>
          <button type="submit" onClick={onSubmit}>Post Question</button>
        </form>

        <h2>Your Previous Questions</h2>
        <ul>
          <li>
            <a className="prevQuestions" href="/question1">
              How to use JavaScript to create interactive web pages?
            </a>
          </li>
          <li>
            <a className="prevQuestions" href="/question2">
              What are the best practices for responsive web design?
            </a>
          </li>
          {/* Add more previous questions here */}
        </ul>
      </section>

      <footer style={footerStyle}>
        <p>
          &copy; 2023 TechQ. All rights reserved.{" "}
          <a href="/privacy">Privacy Policy</a> |{" "}
          <a href="/terms">Terms of Service</a>
        </p>
      </footer>
    </>
  );
};

export default Question;