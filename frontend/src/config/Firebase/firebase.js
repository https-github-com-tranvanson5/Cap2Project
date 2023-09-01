import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMgzz5bZlJCIesQzPiPH9hHC_DKFWxy8c",
    authDomain: "jobcare-project.firebaseapp.com",
    projectId: "jobcare-project",
    storageBucket: "jobcare-project.appspot.com",
    messagingSenderId: "669639866252",
    appId: "1:669639866252:web:49d4d4a50a2b01dce348a9"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
