// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwm0iRrkXU5PP_4Anj4dqsCFcAeekyu6g",
  authDomain: "test-project-55819.firebaseapp.com",
  projectId: "test-project-55819",
  storageBucket: "test-project-55819.appspot.com",
  messagingSenderId: "155964834939",
  appId: "1:155964834939:web:7656ef64c6af386c6f8ede",
  measurementId: "G-E9G0GY3WR0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
