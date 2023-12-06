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


  
}

export default Login;