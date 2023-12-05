import React, { Component } from 'react';
import { db } from '../firebase'; // Adjust the import path as per your project structure
import { doc, getDoc } from 'firebase/firestore';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: null,
      userProfilePic: '',
      isLoading: true,
      error: null
    };
  }

  async componentDidMount() {
    try {
      const questionDocRef = doc(db, "questions", this.props.question_id);
      const questionDoc = await getDoc(questionDocRef);

      if (questionDoc.exists()) {
        const questionData = questionDoc.data();
        this.setState({ questionData });

        const userDocRef = doc(db, "users", questionData.creator_user_ID);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const imgDocRef = doc(db, "imgs", userData.pic_id);
          const imgDoc = await getDoc(imgDocRef);

          if (imgDoc.exists()) {
            this.setState({ userProfilePic: imgDoc.data().url });
          }
        }
      } else {
        throw new Error("Question not found");
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { isLoading, error, questionData, userProfilePic } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="question-card">
        {userProfilePic && (
          <img src={userProfilePic} alt="User Profile" />
        )}
        <h3>{questionData?.question}</h3>
        <p>Language: {questionData?.languages.join(', ')}</p>
        <p>Tools: {questionData?.tools.join(', ')}</p>
        <p>Additional Info: {questionData?.additional_info}</p>
        {/* Add other attributes as needed */}
      </div>
    );
  }
}

export default QuestionCard;