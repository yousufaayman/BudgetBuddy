// src/firebaseConfig.js
import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDfRq1LerPAoXTy20CK0SHy6A3HU4k-Zak",
    authDomain: "budget-buddy-5d5e7.firebaseapp.com",
    projectId: "budget-buddy-5d5e7",
    storageBucket: "budget-buddy-5d5e7.appspot.com",
    messagingSenderId: "266433027458",
    appId: "1:266433027458:web:4225ca40a40281454c039b",
    measurementId: "G-TPQKP1BNMZ"
};

firebase.initializeApp(firebaseConfig);

export default firebase;