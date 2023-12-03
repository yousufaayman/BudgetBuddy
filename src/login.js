import React, { useState } from 'react';
import 'firebase/auth';
import firebase from 'firebase/app';
import './App.css';

const LoginComponent = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
      });
 };

 const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
      });
 };

 const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log('User signed in successfully:', result.user);
      })
      .catch((error) => {
        console.error('Error during sign in:', error);
      });
 };

 const resetPassword = (email) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('Password reset email sent successfully');
      })
      .catch((error) => {
        console.error('Error during password reset:', error);
      });
 };

 return (
    <div className="App">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
        <button onClick={register}>Register</button>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      <input
        type="email"
        placeholder="Enter your email for password reset"
        onChange={(e) => setState({ email: e.target.value })}
      />
      <button onClick={() => resetPassword(state.email)}>
        Request password reset
      </button>    </div>
 );
};
export default LoginComponent;