const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json');

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

    const userSnapshot = await admin.firestore().collection('users').doc(userRecord.uid).get();

    if (userSnapshot.exists && userSnapshot.data()) {
      res.json({ exists: true});
    } else {
      console.log('User does not exist in Firestore');
      
      res.json({ exists: false });
    }
    
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
app.post('/signup/email', async (req, res) => {
  const { email, password, firstName, lastName, country, currency, avgIncome } = req.body;
  const defaultIncomeCategories = ['Salary', 'Freelancing', 'Investments'];
  const defaultExpenseCategories = ['Rent', 'Utilities', 'Groceries'];

  try {
    const userCredential = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
    });

    const userUID = userCredential.uid;

    // Store additional user information in Firestore
    await admin.firestore().collection('users').doc(userUID).set({
      firstName,
      lastName,
      country,
      currency,
      avgIncome,
      categories: {
        incomeCategories: defaultIncomeCategories,
        expenseCategories: defaultExpenseCategories,
      }
    });

    res.status(201).json({ success: true, user: userUID });
  } catch (error) {
    console.error('Error signing up:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/signup/google', async (req, res) => {
  const { idToken, userData } = req.body;
  const { firstName, lastName, country, currency, avgIncome } = userData;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userSnapshot = await admin.firestore().collection('users').doc(uid).get();

    if (!userSnapshot.exists) {
      await admin.firestore().collection('users').doc(uid).set({
        firstName,
        lastName,
        country,
        currency,
        avgIncome,
      });
      
      const defaultIncomeCategories = ['Salary', 'Freelancing', 'Investments'];
      const defaultExpenseCategories = ['Rent', 'Utilities', 'Groceries'];

      await admin.firestore().collection('categories').doc(uid).set({
        incomeCategories: defaultIncomeCategories,
        expenseCategories: defaultExpenseCategories,
      });

    } else {
      console.log('User already exists');
    }

    res.status(200).json({ message: 'Google sign-up successful' });
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.post('/delete/user', async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    await admin.auth().deleteUser(uid);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
