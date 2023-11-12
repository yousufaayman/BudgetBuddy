const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json'); // Replace with your Firebase credentials file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

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

// checkEmail
app.post('/api/checkUserExistence', async (req, res) => {
  const { email } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    res.json({ exists: true, user: userRecord });
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      res.json({ exists: false });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


// Signup route
app.post('/signup', async (req, res) => {
  const { email, password, firstName, lastName, country, currency, avgIncome } = req.body;

  try {
    const userCredential = await admin.auth().createUser({
      email,
      password,
    });

    const userUID = userCredential.uid; // Correcting this line

    res.status(201).json({ success: true, user: userUID });
  } catch (error) {
    console.error('Error signing up:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
