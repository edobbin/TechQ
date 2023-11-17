import React from 'react';
import ContentPostComponent from './ContentPostComponent';

class AnswerComponent extends ContentPostComponent {
  constructor(props) {
    super(props);

    // Additional properties specific to AnswerComponent
    this.state = {
      answerId: props.answerId,
      upvoteCount: 0,
      downvoteCount: 0,
      upvotedByUsers: [],
      downvotedByUsers: [],
      datePosted: new Date(),
    };
  }

  upvote(userId) {
    if (!this.state.upvotedByUsers.includes(userId)) {
      this.setState(prevState => ({
        upvoteCount: prevState.upvoteCount + 1,
        upvotedByUsers: [...prevState.upvotedByUsers, userId],
      }));
    }
  }

  downvote(userId) {
    if (!this.state.downvotedByUsers.includes(userId)) {
      this.setState(prevState => ({
        downvoteCount: prevState.downvoteCount + 1,
        downvotedByUsers: [...prevState.downvotedByUsers, userId],
      }));
    }
  }

  getUserUpvotes() {
    return this.state.upvotedByUsers.length;
  }

  getUserDownvotes() {
    return this.state.downvotedByUsers.length;
  }

  render() {
    // Extend the render method to include additional UI for AnswerComponent
    return (
      <div>
        <h2>{this.state.content}</h2>
        <p>User: {this.state.user}</p>
        <p>Points: {this.state.points}</p>
        <p>Date Posted: {this.state.datePosted.toString()}</p>
        <p>Answer ID: {this.state.answerId}</p>
        <p>Upvotes: {this.state.upvoteCount}</p>
        <p>Downvotes: {this.state.downvoteCount}</p>
        {/* Additional rendering logic or UI components specific to AnswerComponent */}
      </div>
    );
  }
}

export default AnswerComponent;
