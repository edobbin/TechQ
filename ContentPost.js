class ContentPost {
    constructor(content, user, points) {
      this.content = content;
      this.user = user;
      this.points = points;
      this.datePosted = new Date();
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
      if (this.points < 0) {
        this.points = 0;
      }
    }
  
    editContent(newContent) {
      this.content = newContent;
    }
  
    getDatePosted() {
      return this.datePosted;
    }
  }
  
  module.exports = ContentPost; 