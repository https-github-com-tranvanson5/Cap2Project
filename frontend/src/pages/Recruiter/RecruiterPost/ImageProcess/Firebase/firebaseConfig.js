import { initializeApp, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkPKl3WHVFhozJi6lq89rAE3CoveE5GJ8",
  authDomain: "image-c1c95.firebaseapp.com",
  projectId: "image-c1c95",
  storageBucket: "image-c1c95.appspot.com",
  messagingSenderId: "962953982973",
  appId: "1:962953982973:web:6e49a7203fc707b5c95f94",
  measurementId: "G-94847320WW"
};

// Initialize Firebase and get the storage reference
function initializeFirebaseStorage() {
  try {
    // Check if Firebase app is already initialized
    const existingApp = getApp();

    // If app already exists, return its storage reference
    return getStorage(existingApp);
  } catch (error) {
    // If app doesn't exist, initialize it and return the storage reference
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    return storage;
  }
}

export default initializeFirebaseStorage;
