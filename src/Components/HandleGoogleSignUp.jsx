// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDfRq1LerPAoXTy20CK0SHy6A3HU4k-Zak",
    authDomain: "budget-buddy-5d5e7.firebaseapp.com",
    projectId: "budget-buddy-5d5e7",
    storageBucket: "budget-buddy-5d5e7.appspot.com",
    messagingSenderId: "266433027458",
    appId: "1:266433027458:web:4225ca40a40281454c039b",
    measurementId: "G-TPQKP1BNMZ"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export const handleGoogleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const { user } = result;

    const idToken = await user.getIdToken();
    const {displayName, email} = user;

    let firstName = '';
    let lastName = '';

    if (displayName) {
      const nameArray = displayName.split(' ');
      firstName = nameArray[0];
      lastName = nameArray.slice(1).join(' ');
      return { idToken, firstName, lastName, email};
    }else{
      firstName = displayName
      return { idToken, firstName, email};
    }

  } catch (error) {
    console.error(error.message);
  }
};

export default handleGoogleSignUp