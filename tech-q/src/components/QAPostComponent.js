import React, { Component } from 'react';
import QuestionSubmitComponent from './QuestionSubmitComponent';
import QuestionCard from './QuestionCard';
import AnswerSubmitComponent from './AnswerSubmitComponent';
import AnswerCard from './AnswerCard';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

class QAPostComponent extends Component {
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
    const uniquePostID = Date.now().toString();

    this.setState({
      questionStruct: [questionCard, questionObject],
      qaPostID: uniquePostID
    });

    try {
      await addDoc(collection(db, "qapost"), {
        question: questionObject,
        answers: [],
        qaPostID: uniquePostID,
        postExpirationDateTime: null
      });
    } catch (error) {
      console.error("Error creating new post in Firebase:", error);
    }
  };

  handleSolveClick = async (submittedAnswer) => {
    const answerCard = new AnswerCard(submittedAnswer);
    const newSubmissions = new Map(this.state.submissions)
      .set(submittedAnswer.answer_id, [answerCard, submittedAnswer]);

    this.setState({ submissions: newSubmissions });

    const updatedAnswers = Array.from(newSubmissions.values())
      .map(a => a[1]);

    try {
      const qapostRef = doc(db, "qapost", this.state.qaPostID);
      await updateDoc(qapostRef, { answers: updatedAnswers });
    } catch (error) {
      console.error("Error updating qapost document:", error);
    }
  };

  calculateTimeDifference = (startDate, endDate) => {
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours and ${minutes} minutes`;
  };

  render() {
    const { questionStruct, submissions } = this.state;
    let timeDifferenceDisplay = "";

    if (questionStruct.length > 0) {
      const question = questionStruct[1];
      const startDate = new Date(question.created_date_time.date + ' ' + question.created_date_time.time);
      const endDate = new Date();
      timeDifferenceDisplay = this.calculateTimeDifference(startDate, endDate);
    }

    return (
      <div className="q-a-post-component">
        {questionStruct.length === 0 && (
          <QuestionSubmitComponent onQuestionSubmit={this.handleQuestionSubmitted} />
        )}
        {questionStruct.length > 0 && (
          <button onClick={this.handleSolveClick}>Solve!</button>
        )}
        {questionStruct.length > 0 && questionStruct[0]}
        <div className="answer-submissions">
          {[...submissions.values()].map(([answerCard, _], index) => (
            <div key={index}>{answerCard}</div>
          ))}
        </div>
        {timeDifferenceDisplay && (
          <div className="time-difference">Time Remaining: {timeDifferenceDisplay}</div>
        )}
        <AnswerSubmitComponent onAnswerSubmit={this.handleSolveClick} />
      </div>
    );
  }
}

export default QAPostComponent;