// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfRq1LerPAoXTy20CK0SHy6A3HU4k-Zak",
  authDomain: "budget-buddy-5d5e7.firebaseapp.com",
  projectId: "budget-buddy-5d5e7",
  storageBucket: "budget-buddy-5d5e7.appspot.com",
  messagingSenderId: "266433027458",
  appId: "1:266433027458:web:4225ca40a40281454c039b",
  measurementId: "G-TPQKP1BNMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {auth, firestore}