import React, { Component } from 'react';

class AnswerSubmitComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writtenAnswer: '',
      attachments: [],
      showErrorPopup: false,
    };
  }

  handleWrittenAnswerChange = (event) => {
    this.setState({ writtenAnswer: event.target.value });
  };

  handleAttachmentChange = (event) => {
    this.setState({ attachments: event.target.files });
  };

  validateSubmission = () => {
    const { writtenAnswer, attachments } = this.state;
    return writtenAnswer.trim() !== '' || attachments.length > 0;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.validateSubmission()) {
      this.setState({ showErrorPopup: true });
      setTimeout(() => {
        this.setState({ showErrorPopup: false });
        this.props.onClose(); // Close the modal
      }, 6000);
      return;
    }

    this.props.onSubmit(this.state.writtenAnswer, this.state.attachments);
    this.props.onClose(); // Close the modal after submission
  };

  render() {
    return (
      <div className="answer-submit-modal">
        {this.state.showErrorPopup && (
          <div className="error-popup">
            Nothing was submitted. Please try again.
          </div>
        )}

        <form onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Your answer..."
            value={this.state.writtenAnswer}
            onChange={this.handleWrittenAnswerChange}
          />
          <input
            type="file"
            multiple
            onChange={this.handleAttachmentChange}
          />
          <button type="submit">Submit Answer</button>
        </form>
      </div>
    );
  }
}

export default AnswerSubmitComponent;