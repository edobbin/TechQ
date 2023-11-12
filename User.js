// Base User class
class User {
    constructor(userId, email, username, profilePicture, points) {
      this.userId = userId;
      this.email = email;
      this.username = username;
      this.profilePicture = profilePicture;
      this.points = points;
      this.questions = []; 
      this.answers = []; 
    }
  
    // Common methods for all types of users
    updateProfile(newEmail, newUsername, newProfilePicture) {
      this.email = newEmail;
      this.username = newUsername;
      this.profilePicture = newProfilePicture;
    }
  
    deleteQuestion(questionId) {
      this.questions = this.questions.filter(question => question.id !== questionId);
    }
  
    deleteAnswer(answerId) {
      this.answers = this.answers.filter(answer => answer.id !== answerId);
    }
  
    getQuestions() {
      return this.questions;
    }
  
    getAnswers() {
      return this.answers;
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
  
    getProfile() {
      return {
        userId: this.userId,
        email: this.email,
        username: this.username,
        profilePicture: this.profilePicture,
      };
    }
  }
  
  // AdminUser class inherits from User
  class AdminUser extends User {
    constructor(userId, email, username, profilePicture, points) {
      super(userId, email, username, profilePicture, points);
      this.role = 'admin';
    }
    
    updateUser(userId, newUserData) {
        var userToUpdate = listOfUsers.find(user => user.userId === userId);
    
        if (userToUpdate) {
          userToUpdate.updateProfile(newUserData.email, newUserData.username, newUserData.profilePicture);
          console.log(`User ${userId} updated successfully.`);
        } else {
          console.log(`User ${userId} not found.`);
        }
      }
    
      deleteUser(userId) {
        var userIndex = listOfUsers.findIndex(user => user.userId === userId);
    
        if (userIndex !== -1) {
          var deletedUser = listOfUsers.splice(userIndex, 1)[0];
          console.log(`User ${userId} deleted successfully.`);
          deletedUser.questions.forEach(question => question.delete());
          deletedUser.answers.forEach(answer => answer.delete());
        } else {
          console.log(`User ${userId} not found.`);
        }
      }
    
      viewUserDetails(userId) {
        var userToShow = listOfUsers.find(user => user.userId === userId);
    
        if (userToShow) {
          console.log(`User Details for ${userId}:`, userToShow.getProfile());
        } else {
          console.log(`User ${userId} not found.`);
        }
      }
    
      grantPoints(userId, points) {
        var userToGrantPoints = listOfUsers.find(user => user.userId === userId);
    
        if (userToGrantPoints) {
          userToGrantPoints.increasePoints(points);
          console.log(`Granted ${points} points to User ${userId}.`);
        } else {
          console.log(`User ${userId} not found.`);
        }
      }
    
      revokePoints(userId, points) {
        var userToRevokePoints = listOfUsers.find(user => user.userId === userId);
    
        if (userToRevokePoints) {
          userToRevokePoints.decreasePoints(points);
          console.log(`Revoked ${points} points from User ${userId}.`);
        } else {
          console.log(`User ${userId} not found.`);
        }
      }
    
      viewAllUsers() {
        console.log('List of All Users:');
        listOfUsers.forEach(user => {
          console.log(`User ID: ${user.userId}, Username: ${user.username}, Points: ${user.getPoints()}`);
        });
      }
    
      suspendUser(userId) {
        var userToSuspend = listOfUsers.find(user => user.userId === userId);
    
        if (userToSuspend) {
          // need to decide whether to suspend for a given time or flag them 
          console.log(`User ${userId} suspended.`);
        } else {
          console.log(`User ${userId} not found.`);
        }
      }
    }

  }
  
  // AskingUser class inherits from User
  class AskingUser extends User {
    constructor(userId, email, username, profilePicture, points) {
      super(userId, email, username, profilePicture, points);
    }
  
  }
  
  // AnsweringUser class inherits from User
  class AnsweringUser extends User {
    constructor(userId, email, username, profilePicture, points) {
      super(userId, email, username, profilePicture, points);
    }
  
  }
  
  module.exports = { AdminUser, AskingUser, AnsweringUser };
  