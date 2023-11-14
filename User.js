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

    postQuestion(question) {
        if (this.suspendedUntil && new Date() < this.suspendedUntil) {
            console.log(`User is suspended and cannot post a question until ${this.suspendedUntil}.`);
            return;
        }

        this.questions.push(question);
    }

  
    getAnswers() {
      return this.answers;
    }

    postAnswer(answer) {
        if (this.suspendedUntil && new Date() < this.suspendedUntil) {
            console.log(`User is suspended and cannot post an answer until ${this.suspendedUntil}.`);
            return;
        }

        this.answers.push(answer);
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
    
      suspendUser(userId, suspensionHours) {
        var userToSuspend = listOfUsers.find(user => user.userId === userId);

        if (userToSuspend) {
            // Calculate the suspension end time
            const suspensionEndTime = new Date();
            suspensionEndTime.setHours(suspensionEndTime.getHours() + suspensionHours);

            // Set the suspendedUntil property in the user object
            userToSuspend.suspendedUntil = suspensionEndTime;

            console.log(`User ${userId} suspended until ${suspensionEndTime}.`);
        } else {
            console.log(`User ${userId} not found.`);
        }
    }
  

  }
  
  // AskingUser class inherits from User
  class AskingUser extends User {
    constructor(userId, email, username, profilePicture, points) {
      super(userId, email, username, profilePicture, points);
    }
    
    viewOwnQuestions() {
        return this.questions;
    }

    editQuestion(questionId, newTitle, newContent, newTags) {
        const question = this.questions.find(q => q.questionId === questionId);
        if (question) {
            question.updateQuestion(newTitle, newContent, newTags);
            console.log(`Question ${questionId} updated successfully.`);
        } else {
            console.log(`Question ${questionId} not found.`);
        }
    }

    closeQuestion(questionId) {
        const question = this.questions.find(q => q.questionId === questionId);
        if (question) {
            // Add logic to close the question
            console.log(`Question ${questionId} closed successfully.`);
        } else {
            console.log(`Question ${questionId} not found.`);
        }
    }

    viewOwnAnswers() {
        return this.answers;
    }

    viewQuestionStats(questionId) {
        const question = this.questions.find(q => q.questionId === questionId);
        if (question) {
            const stats = {
                upvotes: question.getUpvotes(),
                // Add more statistics if needed
            };
            console.log(`Statistics for Question ${questionId}:`, stats);
        } else {
            console.log(`Question ${questionId} not found.`);
        }
    }

    applyTagsToQuestion(questionId, newTags) {
        const question = this.questions.find(q => q.questionId === questionId);
        if (question) {
            question.updateQuestion(question.title, question.content, newTags);
            console.log(`Tags applied to Question ${questionId} successfully.`);
        } else {
            console.log(`Question ${questionId} not found.`);
        }
    }

  }
  
  // AnsweringUser class inherits from User
  class AnsweringUser extends User {
    constructor(userId, email, username, profilePicture, points) {
      super(userId, email, username, profilePicture, points);
    }
    
    viewOwnAnswers() {
        return this.answers;
      }
    
      // Method to edit the content of a specific answer
      editAnswer(answerId, newContent) {
        const answerToEdit = this.answers.find(answer => answer.answerId === answerId);
        if (answerToEdit) {
          answerToEdit.editContent(newContent);
          console.log(`Answer ${answerId} edited successfully.`);
        } else {
          console.log(`Answer ${answerId} not found.`);
        }
      }
    
      // Method to delete a specific answer posted by the user
      deleteAnswer(answerId) {
        const answerIndex = this.answers.findIndex(answer => answer.answerId === answerId);
        if (answerIndex !== -1) {
          const deletedAnswer = this.answers.splice(answerIndex, 1)[0];
          console.log(`Answer ${answerId} deleted successfully.`);
          deletedAnswer.delete();
        } else {
          console.log(`Answer ${answerId} not found.`);
        }
      }
    
      // Method to upvote a specific answer
      upvoteAnswer(answerId) {
        const answerToUpvote = this.answers.find(answer => answer.answerId === answerId);
        if (answerToUpvote) {
          answerToUpvote.upvote(this.userId);
          console.log(`Upvoted answer ${answerId}.`);
        } else {
          console.log(`Answer ${answerId} not found.`);
        }
      }
    
      // Method to downvote a specific answer
      downvoteAnswer(answerId) {
        const answerToDownvote = this.answers.find(answer => answer.answerId === answerId);
        if (answerToDownvote) {
          answerToDownvote.downvote(this.userId);
          console.log(`Downvoted answer ${answerId}.`);
        } else {
          console.log(`Answer ${answerId} not found.`);
        }
      }
    
      // Method to retrieve statistics for a specific answer
      getAnswerStats(answerId) {
        const answerToGetStats = this.answers.find(answer => answer.answerId === answerId);
        if (answerToGetStats) {
          return {
            upvotes: answerToGetStats.getUpvoteCount(),
            downvotes: answerToGetStats.getDownvoteCount(),
          };
        } else {
          console.log(`Answer ${answerId} not found.`);
          return null;
        }
      }
    
      // Method to accept the best answer for a specific question
      acceptBestAnswer(questionId, answerId) {
        const question = this.questions.find(q => q.questionId === questionId);
        if (question) {
          question.acceptBestAnswer(answerId);
          console.log(`Best answer accepted for question ${questionId}.`);
        } else {
          console.log(`Question ${questionId} not found.`);
        }
      }

  }
  
  module.exports = { AdminUser, AskingUser, AnsweringUser };
  