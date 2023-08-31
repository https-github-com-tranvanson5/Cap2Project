// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQUzsSCFwqet38uIKLO9xFyibuyNq9L_8",
  authDomain: "note-app-a9890.firebaseapp.com",
  projectId: "note-app-a9890",
  storageBucket: "note-app-a9890.appspot.com",
  messagingSenderId: "622493572867",
  appId: "1:622493572867:web:c3be921a154a6d372b9336",
  measurementId: "G-488MKRJG5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);