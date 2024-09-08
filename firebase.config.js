// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}  from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSztKCohmi_THFEiuyFR5nRxOt3klzxkQ",
  authDomain: "teal-hq-clone.firebaseapp.com",
  projectId: "teal-hq-clone",
  storageBucket: "teal-hq-clone.appspot.com",
  messagingSenderId: "788207044824",
  appId: "1:788207044824:web:8c9dc2b36f995e0f282fad",
  measurementId: "G-0JPVVCY2K5",
};

// Initialize Firebase
export const  app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);