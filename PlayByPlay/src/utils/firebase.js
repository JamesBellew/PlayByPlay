// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6OucpxzSVr4uGpghWLdjzemI1m_C5FiI",
  authDomain: "playbyplay-f5338.firebaseapp.com",
  projectId: "playbyplay-f5338",
  storageBucket: "playbyplay-f5338.appspot.com",
  messagingSenderId: "284075385368",
  appId: "1:284075385368:web:d586fdcca2681eb3fd596d",
  measurementId: "G-ZKEB2P1LFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();