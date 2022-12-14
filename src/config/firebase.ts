// Import the functions you need from the SDKs you need
import Gemmer from "../types/gemmer";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  Timestamp,
  addDoc,
  collection,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const authProvider = new GoogleAuthProvider();

// Firebase auth methods
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, authProvider)
    .then(async (result) => {
      const { user } = result;
      const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

      if (isNewUser === true) {
        const newGemmer: Gemmer = {
          id: user.uid,
          username: user.displayName || user.email || "user",
          email: user.email!,
          bio: "",
          image: "",
          joiningDate: Timestamp.now(),
          collection: [],
          gems: [],
          following: [],
          followers: [],
        };

        const gemmersRef = collection(db, "gemmers");
        await addDoc(gemmersRef, newGemmer);
      }

      return result;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });

export const signOutWithGoogle = () => signOut(auth);

// Sign in with email and password
export const signInWithEmailNPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

// Sign up with email and password
export const signUpWithEmailNPassword = (
  email: string,
  password: string,
  username: string
) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const newGemmer: Gemmer = {
        id: user.uid,
        username: username,
        email: email.toLowerCase(),
        bio: "",
        image: "",
        joiningDate: Timestamp.now(),
        collection: [],
        gems: [],
        following: [],
        followers: [],
      };

      const gemmersRef = collection(db, "gemmers");
      await addDoc(gemmersRef, newGemmer);
    })
    .catch((error) => {
      console.log(error);
    });

// Firestore
export const db = getFirestore(app);

// Firebase Storage
export const storage = getStorage(app);
