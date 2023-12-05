import React, { Component } from 'react';
import { db } from '../firebase'; // Adjust the import path as per your project structure
import { doc, getDoc } from 'firebase/firestore';
import { createObjectFromDoc } from '../DocumentUtil';

class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerData: null,
      userProfilePic: '',
      isLoading: true,
      error: null
    };
  }

  async componentDidMount() {
    try {
      const answerDocRef = doc(db, "answers", this.props.answer_id);
      const answerDoc = await getDoc(answerDocRef);

      if (answerDoc.exists()) {
        const answerData = answerDoc.data();
        this.setState({ answerData });

        const userDocRef = doc(db, "users", answerData.creator_user_ID);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          this.setState({ userProfilePic: userDoc.data().profilePicUrl });
        }
      } else {
        throw new Error("Answer not found");
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleUpvote = async () => {
    try {
        const answerObject = await createObjectFromDoc(this.answerData.answer_id, "answers");
        console.log(answerObject);

        answerObject.update({answer_ID:this.answerObject.answer_votes+1});
      } catch (error) {
        console.error("Error creating answer object from document.", error);
      }
    
    
  };

  handleDownvote = async () => {
    try {
        const answerObject = await createObjectFromDoc(this.answerData.answer_id, "answers");
        console.log(answerObject);

        answerObject.update({answer_ID:answerObject.answer_votes-1});
      } catch (error) {
        console.error("Error creating answer object from document.", error);
      }
  };

  render() {
    const { isLoading, error, answerData, userProfilePic } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="answer-card">
        {userProfilePic && (
          <img src={userProfilePic} alt="User Profile" />
        )}
        <p>{answerData?.answer}</p>
        <div className="voting">
          <button onClick={this.handleUpvote}>Upvote</button>
          <span>{answerData?.answer_votes}</span>
          <button onClick={this.handleDownvote}>Downvote</button>
        </div>
        {/* Add other attributes as needed */}
      </div>
    );
  }
}

export default AnswerCard;