class Answer {
    constructor(answerId, content, user, points) {
      this.answerId = answerId;
      this.content = content;
      this.user = user;
      this.points = points;
      this.upvoteCount = 0;
      this.downvoteCount = 0;
      this.datePosted = new Date();
      this.upvotedByUsers = [];
      this.downvotedByUsers = [];
    }
  
    delete() {
      // Handle answer deletion
      var answerIndex = listOfAnswers.findIndex(a => a.answerId === this.answerId);
  
      if (answerIndex !== -1) {
        listOfAnswers.splice(answerIndex, 1);
      }
    }
  
    upvote() {
      this.upvoteCount++;
    }
  
    downvote() {
      this.downvoteCount++;
    }
  
    getContent() {
      return this.content;
    }
  
    getUser() {
      return this.user;
    }
  
    getPoints() {
      return this.points;
    }
  
    increasePoints(amount) {
      this.points += amount;
    }
  
    decreasePoints(amount) {
      this.points -= amount;
    }
  
    getUpvoteCount() {
      return this.upvoteCount;
    }
  
    getDownvoteCount() {
      return this.downvoteCount;
    }
  
    upvote(userId) {
        if (!this.upvotedByUsers.includes(userId)) {
          this.upvoteCount++;
          this.upvotedByUsers.push(userId);
        }
      }
    
      downvote(userId) {
        if (!this.downvotedByUsers.includes(userId)) {
          this.downvoteCount++;
          this.downvotedByUsers.push(userId);
        }
      }
    
      getUserUpvotes() {
        return this.upvotedByUsers.length;
      }
    
      getUserDownvotes() {
        return this.downvotedByUsers.length;
      }
  
    editContent(newContent) {
      this.content = newContent;
    }
  
    getDatePosted() {
      return this.datePosted;
    }
  }
  
  module.exports = Answer; // If using Node.js with CommonJS modules
  