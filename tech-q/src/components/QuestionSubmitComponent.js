import React, { Component } from 'react';
import './QuestionSubmitComponent.css';

class QuestionSubmitComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: '',
      languages: [''],
      tools: [''],
      expirationDateTime: '',
      additionalInfo: ''
    };
  }

  handleInputChange = (event, field, index) => {
    if (field === 'languages' || field === 'tools') {
      const items = [...this.state[field]];
      items[index] = event.target.value;
      this.setState({ [field]: items });
    } else {
      this.setState({ [field]: event.target.value });
    }
  };

  addField = (field) => {
    this.setState(prevState => ({
      [field]: [...prevState[field], '']
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state); // Pass the state back to the parent component
    this.props.onClose(); // Close the modal
  };

  renderFieldGroup = (field) => {
    return this.state[field].map((item, index) => (
      <div key={index}>
        <input
          type="text"
          value={item}
          onChange={(e) => this.handleInputChange(e, field, index)}
        />
      </div>
    ));
  };

  render() {
    return (
      <div className="question-submit-modal">
        <form onSubmit={this.handleSubmit} className="question-form">
          <div className="form-field">
            <h3>Question</h3>
            <textarea
              value={this.state.questionText}
              onChange={(e) => this.handleInputChange(e, 'questionText')}
              placeholder="Enter your question"
              required
            />
          </div>
          <div className="form-field">
            <h3>Additional Information</h3>
            <textarea
              value={this.state.additionalInfo}
              onChange={(e) => this.handleInputChange(e, 'additionalInfo')}
              placeholder="Enter any additional information"
            />
          </div>
          <div className="form-field">
            <h3>Languages</h3>
            {this.renderFieldGroup('languages')}
            <button type="button" onClick={() => this.addField('languages')}>Add Language</button>
          </div>
          <div className="form-field">
            <h3>Tools</h3>
            {this.renderFieldGroup('tools')}
            <button type="button" onClick={() => this.addField('tools')}>Add Tool</button>
          </div>
          <div className="form-field">
            <h3>Expiration Date and Time</h3>
            <input
              type="datetime-local"
              value={this.state.expirationDateTime}
              onChange={(e) => this.handleInputChange(e, 'expirationDateTime')}
            />
          </div>
          <button type="submit">Submit Question</button>
        </form>
      </div>
    );
  }
}

export default QuestionSubmitComponent;