import React, { useState } from 'react';
import { firebaseApp } from './firebaseConfig';
import {
 GoogleAuthProvider,
 signInWithEmailAndPassword,
 signInWithPopup,
 onAuthStateChanged,
 sendPasswordResetEmail,
} from 'firebase/auth';

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState(null);
 const auth = firebaseApp.auth();

 const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in:', user);
      })
      .catch((error) => {
        setError(error.message);
      });
 };

 const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log('User signed in with Google:', user);
      })
      .catch((error) => {
        setError(error.message);
      });
 };

 const sendPasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError('Password reset email sent.');
      })
      .catch((error) => {
        setError(error.message);
      });
 };

 return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Login</button>
      <button onClick={signInWithGoogle}>Login with Google</button>
      <button onClick={sendPasswordReset}>Reset Password</button>
      {error && <p>{error}</p>}
    </div>
 );
};

export default Login;