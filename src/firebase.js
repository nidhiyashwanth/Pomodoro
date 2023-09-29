import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signOut as signOutFromFirebase } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTJq1kextU7xdbk7am8l5lYc8R8jDDetQ",
  authDomain: "pomodoro-5f2ec.firebaseapp.com",
  projectId: "pomodoro-5f2ec",
  storageBucket: "pomodoro-5f2ec.appspot.com",
  messagingSenderId: "840311720848",
  appId: "1:840311720848:web:260900389a6c314baf4115",
  measurementId: "G-7SZBKPES8K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signOut = async () => {
  try {
    await signOutFromFirebase(auth);
  } catch (err) {
    console.error(err);
  }
};

export { db, auth, googleProvider };