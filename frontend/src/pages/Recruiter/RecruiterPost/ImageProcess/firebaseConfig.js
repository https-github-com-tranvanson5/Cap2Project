import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1A6G3XWBj5tFqixDIKKdzeSX3EKFhFFA",
  authDomain: "image-4723f.firebaseapp.com",
  projectId: "image-4723f",
  storageBucket: "image-4723f.appspot.com",
  messagingSenderId: "788256299428",
  appId: "1:788256299428:web:25944a5e2f8375f8318931",
  measurementId: "G-PW7CDRTW1H"
};
// Initialize Firebase and get the storage reference
function initializeFirebaseStorage() {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  return storage;
}

export default initializeFirebaseStorage;