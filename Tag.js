class Tag {
    constructor(tagName, tagDescription) {
      this.tagName = tagName;
      this.tagDescription = tagDescription;
      this.questions = []; 
    }
  
    addQuestion(questionId) {
      if (!this.questions.includes(questionId)) {
        this.questions.push(questionId);
      }
    }
  
    removeQuestion(questionId) {
      const index = this.questions.indexOf(questionId);
      if (index !== -1) {
        this.questions.splice(index, 1);
      }
    }
  
    getQuestions() {
      return this.questions;
    }
  
    getTagInfo() {
      return {
        tagName: this.tagName,
        tagDescription: this.tagDescription,
      };
    }
  
    updateTagInfo(newName, newDescription) {
      this.tagName = newName;
      this.tagDescription = newDescription;
    }
  
    deleteTag() {
        this.questions = [];
        console.log(`Tag "${this.tagName}" deleted successfully.`);
      }
  }
  
  module.exports = Tag; 
  