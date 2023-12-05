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


// import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
// import { db } from '../firebase'; // Adjust the import path as per your project structure

// class Answer {
//   constructor(answer, creator_user_ID, question_ID) {
//     this.answer = answer;
//     this.creator_user_ID = creator_user_ID;
//     this.question_ID = question_ID;
//     this.answer_votes = 0; // Initialize answer votes to 0
//     this.answers_date_time = new Date(); // Current timestamp
//     this.answer_ID = null; // Will be set after saving the document
//   }

//   async save() {
//     try {
//       const docRef = await addDoc(collection(db, "answers"), this);
//       this.answer_ID = docRef.id;
//       console.log("Answer saved with ID: ", docRef.id);
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   }

//   async delete() {
//     if (!this.answer_ID) {
//       console.error("Error: No ID found for this answer.");
//       return;
//     }

//     try {
//       await deleteDoc(doc(db, "answers", this.answer_ID));
//       console.log("Answer deleted with ID: ", this.answer_ID);
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   }
// }

// export default Answer;