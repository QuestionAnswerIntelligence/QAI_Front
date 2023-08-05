import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC31C1ClaQSyMyjKCkZMZFQKMFMyZ9ayMo",
  authDomain: "question-answer-intelligence.firebaseapp.com",
  projectId: "question-answer-intelligence",
  storageBucket: "question-answer-intelligence.appspot.com",
  messagingSenderId: "46976868244",
  appId: "1:46976868244:web:4c81632c594f025b7e3981",
  measurementId: "G-XM89100Q9Z",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
