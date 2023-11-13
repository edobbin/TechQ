class Answer extends ContentPost {
  constructor(answerId, content, user, points) {
    super(content, user, points);
    this.answerId = answerId;
    this.upvoteCount = 0;
    this.downvoteCount = 0;
    this.upvotedByUsers = [];
    this.downvotedByUsers = [];
  }

  delete() {
   
    var answerIndex = listOfAnswers.findIndex(a => a.answerId === this.answerId);

    if (answerIndex !== -1) {
      listOfAnswers.splice(answerIndex, 1);
    }
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
}

module.exports = Answer; 
