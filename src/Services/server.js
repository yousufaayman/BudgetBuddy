const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json'); // Replace with your Firebase credentials file
const nodemailer = require('nodemailer');

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

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
