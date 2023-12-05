import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase'; // Adjust the import path as per your project structure

class Question {
  constructor(additional_info, creator_user_ID, languages, question, tools, date, time,question_difficulty,question_ID) {
    this.additional_info = additional_info;
    this.creator_user_ID = creator_user_ID;
    this.languages = languages; 
    this.question = question;
    this.tools = tools;
    this.created_date_time = { date, time };
    this.question_difficulty=question_difficulty
    this.question_ID = null; // Will be set after saving the document
  }

  generateQuestionID() {
    // Generate a unique question ID
    return new Date().getTime().toString();
  }

  async save() {
    try {
      const docRef = await addDoc(collection(db, "questions"), this);
      this.question_ID = docRef.id;
      console.log("Question saved with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async delete() {
    if (!this.question_ID) {
      console.error("Error: No ID found for this question.");
      return;
    }

    try {
      await deleteDoc(doc(db, "questions", this.question_ID));
      console.log("Question deleted with ID: ", this.question_ID);
      // To remove the object, you can set it to null in the component where it's being used
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

  async update(updates) {
    try {
      await this.delete(); // Delete the current document

      // Update properties
      Object.keys(updates).forEach(key => {
        if (this.hasOwnProperty(key)) {
          this[key] = updates[key];
        }
      });

      await this.save(); // Save the updated document
      console.log("Question updated with ID: ", this.question_ID);
    } catch (error) {
      console.error("Error updating question: ", error);
      throw error;
    }
  }
}

export default Question;

// How to use the class
// import Question from './Question';

// Assuming you have created and saved a question
// const newQuestion = new Question(/* parameters */);
// await newQuestion.save();

// When you need to delete the question
// await newQuestion.delete();