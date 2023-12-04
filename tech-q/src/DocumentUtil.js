// Import necessary Firestore modules and your Firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the import path as per your project structure

import Question from './components/QuestionComponent'; // Adjust the path as needed
import Answer from './components/AnswerComponent'; // Adjust the path as needed

// Define and export the createObjectFromDoc function
export async function createObjectFromDoc(id, collectionName) {
  if (!id || !collectionName) {
    throw new Error("Missing required parameters");
  }

  try {
    let fieldToCheck = collectionName === "questions" ? "question_ID" : "answer_ID";
    const q = query(collection(db, collectionName), where(fieldToCheck, "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error(`No document found with ${fieldToCheck} = ${id} in ${collectionName}`);
    }

    // Assuming only one document will match
    const docData = querySnapshot.docs[0].data();
    let objectInstance;

    // Instantiate based on collection name
    if (collectionName === "questions") {
      objectInstance = new Question(
        docData.question,
        docData.creator_user_ID,
        docData.languages,
        docData.tools,
        docData.additional_info,
        docData.date,
        docData.time,
        docData.question_ID
        //id // Assuming the constructor can take an ID
      );
    } else if (collectionName === "answers") {
      objectInstance = new Answer(
        docData.answer,
        docData.creator_user_ID,
        docData.question_ID,
        docData.answer_votes,
        docData.answers_date_time,
        docData.answer_ID
        //id // Assuming the constructor can take an ID
      );
    } else {
      throw new Error("Invalid collection name");
    }

    return objectInstance;
  } catch (error) {
    console.error("Error creating object from document: ", error);
    throw error;
  }
}