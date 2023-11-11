const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json'); // Replace with your Firebase credentials file

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Firebase Authentication middleware
const authenticate = async (req, res, next) => {
  const idToken = req.header('Authorization');
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password, additionalInfo } = req.body;

  try {
    const userCredential = await admin.auth().createUser({
      email,
      password,
    });

    const user = userCredential.uid;

    // Save additional user information to your database
    // Replace this with your database code
    // Example: database.collection('users').doc(user).set(additionalInfo);

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('Error signing up:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
