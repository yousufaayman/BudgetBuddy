const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json'); // Replace with your Firebase credentials file
const nodemailer = require('nodemailer');
const { sendMail } = require('./Mailer')


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


app.get('/userProfile/:userID', async (req, res) => {
  try {
    const uid = req.params.userID;

    // Fetch user profile from Firestore
    const userRef = admin.firestore().collection('users').doc(uid);
    const snapshot = await userRef.get();

    if (snapshot.exists) {
      const userData = snapshot.data();
      res.status(200).json(userData);
    } else {
      res.status(500).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/updateProfile/:userID', async (req, res) => {
  try {
    const uid = req.params.userID;
    const { firstName, lastName } = req.body; 

    // Update user profile in Firestore
    const userRef = admin.firestore().collection('users').doc(uid);
    await userRef.update({
      firstName,
      lastName
    });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Configure Nodemailer with your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace//////
  auth: {
    user: 'your-email@gmail.com', 
    pass: 'your-password' 
  }
});

app.post('/api/sendNotification', async (req, res) => {
    const { email, subject, message } = req.body;
  
    try {
      let mailOptions = {
        from: 'your-email@gmail.com', // Replace //////
        to: email,
        subject: subject,
        text: message
      };
  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).json({ error: 'Error sending email' });
        } else {
          console.log('Email sent: ' + info.response);
          res.json({ success: true });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  await sendMail({
    from: 'seif.elbosaty3@gmail.com',
    to: 'seif.elbosaty90@gmail.com',
    subject: `Buddy budget`,
    text: 'todays update',
    html: `<h1>new updates</h1>`
  });

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
