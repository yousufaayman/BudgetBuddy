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

// Add a new transaction
app.post('/user/transaction', async (req, res) => {
  try {
    const { title, amount, category, date, description, recurring, type, userID } = req.body;

    // Create a new transaction document inside the user's transactions subcollection
    const transactionDocRef = await admin.firestore().collection('users').doc(userID).collection('user_transactions').add({
      title,
      amount,
      category,
      date: admin.firestore.Timestamp.fromDate(new Date(date)),
      description,
      recurring,
      type,
    });

    res.status(201).json({ success: true, transactionID: transactionDocRef.id });
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
