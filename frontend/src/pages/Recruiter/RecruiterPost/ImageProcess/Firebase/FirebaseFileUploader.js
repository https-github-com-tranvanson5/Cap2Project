import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import initializeFirebaseStorage from '~/pages/Recruiter/RecruiterPost/ImageProcess/Firebase/firebaseConfig';

const FirebaseFileUploader = async (imageUpload,storageRef) => {
    if (imageUpload) {
        try {
            const snapshot = await uploadBytes(storageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);
            return url;
        } catch (error) {
            console.error("Error uploading the file: ", error);
            throw error; // Re-throw the error to handle it elsewhere if needed
        }
    }
}

export default FirebaseFileUploader;
