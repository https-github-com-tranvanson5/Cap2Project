import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDkPKl3WHVFhozJi6lq89rAE3CoveE5GJ8',
    authDomain: 'image-c1c95.firebaseapp.com',
    projectId: 'image-c1c95',
    storageBucket: 'image-c1c95.appspot.com',
    messagingSenderId: '962953982973',
    appId: '1:962953982973:web:6e49a7203fc707b5c95f94',
    measurementId: 'G-94847320WW',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
