const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json');
const axios = require('axios');

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

app.post('/user/transaction', async (req, res) => {
  try {
    const { title, amount, category, date, description, recurring, type, userID } = req.body;

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

    if (recurring === 'true') {
      const currentDate = new Date(date);
      currentDate.setMonth(currentDate.getMonth() + 1);

      const newTransaction = {
        title,
        amount,
        category,
        date: admin.firestore.Timestamp.fromDate(currentDate),
        description,
        recurring,
        type,
        userID
      };

      try {
        const userToken = 'b08502d697e50b56a999fd1d7042dc79';
        const newTransactionString = JSON.stringify(newTransaction);
        const postEndpoint = 'https://gmi0yl-ip-156-213-152-119.tunnelmole.net/user/transaction'

        const response = await axios.get(`https://www.easycron.com/rest/add?token=${userToken}&cron_job_name=${userID}&cron_expression=0%200%20${currentDate.getDate()}%20${currentDate.getMonth() + 1}%20*&url=${postEndpoint}&method=POST&headers=Content-Type:application/json|Authorization:b08502d697e50b56a999fd1d7042dc79&body=${encodeURIComponent(newTransactionString)}`);
        console.log('Recurring transaction scheduled:', response.data);
      } catch (error) {
        console.error('Error scheduling recurring transaction:', error);
      }
    }
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/user/getExpenseCategories/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    const categoriesSnapshot = await admin.firestore().collection('users').doc(userID).get();
    if (!categoriesSnapshot.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const categoriesData = categoriesSnapshot.data().categories;
    const expenseCategories = categoriesData.expenseCategories || [];

    res.status(200).json({ expenseCategories });
  } catch (error) {
    console.error('Error fetching expense categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/user/getIncomeCategories/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    const categoriesSnapshot = await admin.firestore().collection('users').doc(userID).get();
    if (!categoriesSnapshot.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const categoriesData = categoriesSnapshot.data().categories;
    const incomeCategories = categoriesData.incomeCategories || [];

    res.status(200).json({ incomeCategories });
  } catch (error) {
    console.error('Error fetching income categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
