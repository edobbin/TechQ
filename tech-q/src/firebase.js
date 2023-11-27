// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDN0LrBBFaSe0W9i-331CwTI_TM_2EiwYw",
  authDomain: "techq-5412b.firebaseapp.com",
  projectId: "techq-5412b",
  storageBucket: "techq-5412b.appspot.com",
  messagingSenderId: "75170556973",
  appId: "1:75170556973:web:a56f7d21dd771e1a83dca4",
  measurementId: "G-NN5G7L3RX5"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

