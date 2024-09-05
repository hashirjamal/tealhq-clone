// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider}  from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpV05GZjFrFcRco7ZhlQOlyclQbzgGCWg",
  authDomain: "flashcard-saas-cbc89.firebaseapp.com",
  projectId: "flashcard-saas-cbc89",
  storageBucket: "flashcard-saas-cbc89.appspot.com",
  messagingSenderId: "817837899892",
  appId: "1:817837899892:web:0692733bd0e6a4eb6f1121",
  measurementId: "G-69H7DTYM3C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);