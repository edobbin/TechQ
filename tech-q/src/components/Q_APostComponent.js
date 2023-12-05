import React, { Component } from 'react';
import QuestionSubmitComponent from './QuestionSubmitComponent';
import QuestionCard from './QuestionCard';
import AnswerSubmitComponent from './AnswerSubmitComponent';
import AnswerCard from './AnswerCard';
import { db } from '../firebase';
import { collection, addDoc ,doc,updateDoc} from 'firebase/firestore';

class Q_APostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = props.initialData || {
        questionStruct: new Map(), 
        submissions: [],
        qaPostID: null,
        postDuration: null,
        postExpirationDateTime: null
    };
  }

  handleQuestionSubmitted = async (questionObject) => {
    const questionCard = new QuestionCard(questionObject);
    const uniquePostID = Date.now().toString(); // Unique ID using timestamp
    this.setState({
      questionStruct: [questionCard, questionObject],
      qaPostID: uniquePostID
    });
  
    // Create a new document in Firebase
    try {
      await addDoc(collection(db, "qapost"), {
        question: questionObject, // Assuming this is the format expected in Firebase
        answers: [], // Initially, no answers
        qaPostID: uniquePostID,
        postExpirationDateTime: null // Or calculate based on postDuration if needed
      });
    } catch (error) {
      console.error("Error creating new post in Firebase:", error);
    }
  };

  handleSolveClick = async (submittedAnswer) => {
    const { questionStruct, submissions, qaPostID } = this.state;
  
    // Create new AnswerCard object with submitted answer
    const answerCard = new AnswerCard(submittedAnswer);
  
    // Update the submissions state
    const newSubmissions = new Map(submissions).set(submittedAnswer.answer_id, [answerCard, submittedAnswer]);
    this.setState({ submissions: newSubmissions });
  
    // Prepare the data to update the qapost document
    const updatedAnswers = Array.from(newSubmissions.values()).map(a => a[1]); // Extracting answer objects
  
    // Update the qapost document in Firebase
    try {
      const qapostRef = doc(db, "qapost", qaPostID);
      await updateDoc(qapostRef, {
        answers: updatedAnswers
      });
    } catch (error) {
      console.error("Error updating qapost document:", error);
    }
  };

  saveToFirebase = async () => {
    const { questionStruct, submissions, qaPostID, postExpirationDateTime } = this.state;
    const answersArray = Array.from(submissions.values());
  
    try {
      await addDoc(collection(db, "qapost"), {
        qaPostID,
        question: questionStruct[1], // Assuming the second element is the question object
        answers: answersArray.map(a => a[1]), // Assuming the second element is the answer object
        postExpirationDateTime
      });
    } catch (error) {
      console.error("Error saving to Firebase:", error);
    }
  };

  // Convert minutes to hours and minutes for display
  displayPostDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hours ${mins} minutes`;
  };

  render() {
    const { questionStruct, submissions, postDuration } = this.state;

    return (
        <div className="q-a-post-component">
                <QuestionSubmitComponent onQuestionSubmit={this.handleQuestionSubmitted} />
                
                {/* Conditionally render the Solve button if a question is submitted */}
                {questionStruct.length > 0 && (
                    <button onClick={this.handleSolveClick}>Solve!</button>
                )}

                {/* Render QuestionCard */}
                {questionStruct.length > 0 && questionStruct[0]}

                {/* Render list of AnswerCard components */}
                <div className="answer-submissions">
                    {[...submissions.values()].map(([answerCard, _]) => (
                        <div key={answerCard.props.answer_id}>
                            {answerCard}
                        </div>
                    ))}
                </div>

                {/* Display post duration */}
                {postDuration && (
                    <div className="post-duration">
                        Post Duration: {this.displayPostDuration(postDuration)}
                    </div>
                )}

                <AnswerSubmitComponent onAnswerSubmit={this.handleSolveClick} />
            </div>
    );
  }
}

export default Q_APostComponent;