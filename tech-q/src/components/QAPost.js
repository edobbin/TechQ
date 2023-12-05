import React, { Component } from 'react';
import { db } from '../firebase';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import Question from './QuestionComponent';
import QuestionCard from './QuestionCard';
import AnswerCard from './AnswerCard';
import Answer from './AnswerComponent';
import './QAPost.css'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionStruct: null,
      submissions: [],
      postID: null,
      showingAnswerForm: false 
    };
  }

  async componentDidMount() {
    const userID = await this.fetchUserID();
    const question = await this.createQuestion(userID);
    question.save();
    const questionCard = new QuestionCard(question);
    this.setState({ questionStruct: questionCard, postID: this.generatePostID() });
    this.saveToFirestore(questionCard);
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  fetchUserID = async () => {
    const user = auth.currentUser;
  return user ? user.uid : null;
  };

  createQuestion = async (userID) => {
    // Create a Question object
    const question = new Question(/* parameters with userID */);
    await question.save();
    return question;
  };
  handleSubmitAnswer = (answerData, attachments) => {
    if (!answerData && (!attachments || attachments.length === 0)) {
      // Show error and return
      this.setState({ showErrorPopup: true });
      setTimeout(() => this.setState({ showErrorPopup: false, showingAnswerForm: false }), 6000);
      return;
    }
  
    const userID = this.fetchUserID();
    const answerDateTime = new Date();
    const answerID = this.generatePostID();
  
    const answer = new Answer([answerData, attachments], userID, this.state.questionStruct.question.question_ID, answerDateTime, answerID);
    answer.save();
    this.addAnswer(answer);
  
    this.setState({ showingAnswerForm: false });
  };

  generatePostID = () => {
    return `${Math.random().toString(36).substr(2, 9)}-${new Date().getTime()}`;
  };

  saveToFirestore = async (questionCard) => {
    // Save the questionStruct to Firestore
    await addDoc(collection(db, "qapost"), {
      questionStruct: questionCard,
      submissions: this.state.submissions,
      postID: this.state.postID
    });
  };

  handleSolveClick = () => {
    this.setState({ showingAnswerForm: true });
  };

  addAnswer = (answer) => {
    const answerCard = new AnswerCard(answer);
    this.setState(prevState => ({
      submissions: [...prevState.submissions, answerCard]
    }), this.updateFirestore);
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    this.setState({
      currentTime: new Date() // Update the current time
    });
  };

  renderCountdownTimer = () => {
    const { questionStruct, currentTime } = this.state;
    if (!questionStruct || !questionStruct.expirationDateTime) return null;
  
    const endTime = new Date(questionStruct.expirationDateTime);
    const timeLeft = endTime - currentTime;
  
    if (timeLeft <= 0) {
      clearInterval(this.timerID);
      return 'Time is up!';
    }
  
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
    return `${hours}h ${minutes}m ${seconds}s left`;
  };

  updateFirestore = async () => {
    const qapostRef = doc(db, "qapost", this.state.postID);
    try {
      await updateDoc(qapostRef, { submissions: this.state.submissions.map(sub => sub.props.answer) });
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };

  render() {
    const { questionStruct, submissions, showingAnswerForm, showErrorPopup } = this.state;
  
    return (
      <div className="post-container">
        {showingAnswerForm && (
          <AnswerSubmitComponent onSubmit={this.handleSubmitAnswer} />
        )}
        {showErrorPopup && (
          <div className="error-popup">Nothing was submitted. Please try again.</div>
        )}
        <div className="post-container">
            <div className="question-card-container" onClick={this.handleQuestionCardClick}>
                <QuestionCard question={questionStruct} />
            </div>
            <div className="countdown-timer">
                {this.renderCountdownTimer()}
            </div>
        </div>
        
        <div className="answers-container">
          {submissions.slice(0, 4).map((answerCard, index) => (
            <div key={index} className="answer-card" onClick={() => this.handleAnswerCardClick(answerCard)}>
              {answerCard}
            </div>
          ))}
        </div>
        {!showingAnswerForm && (
          <button onClick={this.handleSolveClick}>Solve</button>
        )}
      </div>
    );
  }
}

export default Post;