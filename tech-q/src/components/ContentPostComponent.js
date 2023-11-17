import React from 'react';

class ContentPostComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.content,
      user: props.user,
      points: props.points,
      datePosted: new Date(),
    };
  }

  getContent() {
    return this.state.content;
  }

  getUser() {
    return this.state.user;
  }

  getPoints() {
    return this.state.points;
  }

  increasePoints(amount) {
    this.setState(prevState => ({
      points: prevState.points + amount,
    }));
  }

  decreasePoints(amount) {
    this.setState(prevState => ({
      points: Math.max(0, prevState.points - amount),
    }));
  }

  editContent(newContent) {
    this.setState({
      content: newContent,
    });
  }

  getDatePosted() {
    return this.state.datePosted;
  }

  render() {
    return (
      <div>
        <h2>{this.state.content}</h2>
        <p>User: {this.state.user}</p>
        <p>Points: {this.state.points}</p>
        <p>Date Posted: {this.state.datePosted.toString()}</p>
        {/* Additional rendering logic or UI components can be added here */}
      </div>
    );
  }
}

export default ContentPostComponent;
