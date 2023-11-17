import React from 'react';
import './Question.css'

const Question = () => {
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
  }

  return (
    <>
      <section className="content" style={sectionStyle}>
        <h1>Ask a Question</h1>
        <form action="post_question.php" method="POST">
          <label htmlFor="question">Your Question:</label>
          <textarea id="question" name="question" rows="5" required></textarea>
          <input type="submit" value="Post Question" />
        </form>

        <h2>Your Previous Questions</h2>
        <ul>
          <li><a className="prevQuestions" href="/question1">How to use JavaScript to create interactive web pages?</a></li>
          <li><a className="prevQuestions" href="/question2">What are the best practices for responsive web design?</a></li>
          {/* Add more previous questions here */}
        </ul>
      </section>

      <footer style={footerStyle}>
        <p>&copy; 2023 TechQ. All rights reserved. <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
      </footer>
    </>
  );
};

export default Question;



// import React from 'react';
// import QuestionComponent from './QuestionComponent'; // Adjust the import path based on your file structure

// const QuestionPage = () => {
//   const sampleQuestion = {
//     questionId: '123456', // Provide a unique questionId
//     title: 'How to use React?',
//     content: 'I am new to React. Can someone guide me on how to get started?',
//     tags: ['react', 'javascript'],
//     answers: [], // An array of answer objects (if any)
//     upvotes: ['user1', 'user2'], // An array of user IDs who upvoted
//   };

//   return (
//     <div>
//       <h1>Question Page</h1>
//       <QuestionComponent
//         questionId={sampleQuestion.questionId}
//         title={sampleQuestion.title}
//         content={sampleQuestion.content}
//         tags={sampleQuestion.tags}
//         answers={sampleQuestion.answers}
//         upvotes={sampleQuestion.upvotes}
//       />
//     </div>
//   );
// };

// export default QuestionPage;
