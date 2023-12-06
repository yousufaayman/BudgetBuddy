const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.setMaxListeners(20);

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

// Get User Wallets 
app.get('/user/wallets/:userID', async (req, res) => {
  const userid = req.params.userID;

  try {
    const walletsRef = admin.firestore().collection('users').doc(userid).collection('user_wallets');
    const walletsSnapshot = await walletsRef.get();
    
    let wallets = [];
    
    walletsSnapshot.forEach(doc => {
      wallets.push({
        id: doc.id,
        ...doc.data()
      });
    });


    res.status(200).json({ wallets });
  } catch (error) {
    console.error('Error retrieving wallets:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
