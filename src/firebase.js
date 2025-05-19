// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrLgPqRwv3FXRr_VjE_KkzQWAEhOzfL60",
  authDomain: "finance-tracker-b978f.firebaseapp.com",
  projectId: "finance-tracker-b978f",
  storageBucket: "finance-tracker-b978f.firebasestorage.app",
  messagingSenderId: "833906250763",
  appId: "1:833906250763:web:daa88bac72e49d632f230e",
  measurementId: "G-LWBV46R7VY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, app, provider, auth, doc, setDoc };
