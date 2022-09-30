// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOGTaZgByOFjzyRViNrvP5JDc2_5edPDk",
  authDomain: "next-hidden-gems.firebaseapp.com",
  projectId: "next-hidden-gems",
  storageBucket: "next-hidden-gems.appspot.com",
  messagingSenderId: "1012435499783",
  appId: "1:1012435499783:web:b116eff5560a1033d5a3a2",
  measurementId: "G-R79KSFDQ7K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();

// Firebase auth methods
export const signInWithGooglePopup = () => signInWithPopup(auth, authProvider);
export const signOutWithGoogle = () => signOut(auth);
