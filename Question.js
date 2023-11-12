class Question {
    constructor(userId, title, content, tags) {
      this.questionId = generateUniqueId(); 
      this.userId = userId;
      this.title = title;
      this.content = content;
      this.tags = tags;
      this.answers = [];
      this.upvotes = new Set();
    }
  
    updateQuestion(title, content, tags) {
      this.title = title;
      this.content = content;
      this.tags = tags;
    }
  
    delete() {
        
        var questionIndex = listOfQuestions.findIndex(q => q.questionId === this.questionId);
    
        if (questionIndex !== -1) {
          listOfQuestions.splice(questionIndex, 1);
        }
    
        
        this.answers.forEach(answer => answer.delete());
    }
    
  
    getAnswers() {
      return this.answers;
    }
  
    addAnswer(answer) {
      this.answers.push(answer);
    }
  
    upvote(userId) {
      this.upvotes.add(userId);
    }
  
    getUpvotes() {
      return this.upvotes.size;
    }
  
    getQuestionDetails() {
      return {
        questionId: this.questionId,
        userId: this.userId,
        title: this.title,
        content: this.content,
        tags: this.tags,
        upvotes: this.getUpvotes(),
      };
    }
  }
  
  function generateUniqueId() {
    // Generate a random 7-digit number
    var randomId = Math.floor(1000000 + Math.random() * 9000000);
    return randomId.toString(); 
  }
  
  module.exports = Question; 
  