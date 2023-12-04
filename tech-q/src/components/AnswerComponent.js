import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase'; // Adjust the import path as per your project structure

class Answer {
  constructor(answer, creator_user_ID, question_ID, date, time) {
    this.answer = answer;
    this.creator_user_ID = creator_user_ID;
    this.question_ID = question_ID;
    this.answer_votes = 0; // Initialize answer votes to 0
    this.answers_date_time = { date, time }; // Current timestamp
    this.answer_ID = null; // Will be set after saving the document
  }

  async save() {
    try {
      const docRef = await addDoc(collection(db, "answers"), this);
      this.answer_ID = docRef.id;
      console.log("Answer saved with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async delete() {
    if (!this.answer_ID) {
      console.error("Error: No ID found for this answer.");
      return;
    }

    try {
      await deleteDoc(doc(db, "answers", this.answer_ID));
      console.log("Answer deleted with ID: ", this.answer_ID);
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

export default Answer;