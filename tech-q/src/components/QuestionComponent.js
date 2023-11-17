import React from 'react';
import ContentPostComponent from './ContentPostComponent'; // Adjust the import path based on your file structure

class QuestionComponent extends ContentPostComponent {
  constructor(props) {
    super(props);

    this.state = {
      questionId: props.questionId,
      title: props.title || '',
      content: props.content || '',
      tags: props.tags || [],
      answers: props.answers || [],
      upvotes: new Set(props.upvotes) || new Set(),
    };
  }

  updateQuestion(title, content, tags) {
    this.setState({
      title,
      content,
      tags,
    });
  }

  delete() {
    // Assuming listOfQuestions is part of your component's state
    const { questionId, answers } = this.state;

    this.setState(prevState => ({
      listOfQuestions: prevState.listOfQuestions.filter(q => q.questionId !== questionId),
    }));

    answers.forEach(answer => answer.delete());
  }

  addAnswer(answer) {
    this.setState(prevState => ({
      answers: [...prevState.answers, answer],
    }));
  }

  upvote(userId) {
    this.setState(prevState => ({
      upvotes: new Set(prevState.upvotes).add(userId),
    }));
  }

  getUpvotes() {
    return this.state.upvotes.size;
  }

  getQuestionDetails() {
    const { questionId, user, title, content, tags } = this.state;

    return {
      questionId,
      userId: user,
      title,
      content,
      tags,
      upvotes: this.getUpvotes(),
    };
  }

  render() {
    // Extend the render method to include additional UI for QuestionComponent
    return (
      <div>
        <h2>{this.state.title}</h2>
        <p>User: {this.state.user}</p>
        <p>Content: {this.state.content}</p>
        <p>Tags: {this.state.tags.join(', ')}</p>
        <p>Upvotes: {this.getUpvotes()}</p>
        {/* Additional rendering logic or UI components specific to QuestionComponent */}
      </div>
    );
  }
}

export default QuestionComponent;
