import React, { useState } from 'react';
import { auth, googleProvider } from './firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Remember Me:
        <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <button onClick={handleForgotPassword}>Forgot Password</button>
    </div>
  );


}

export default Login;