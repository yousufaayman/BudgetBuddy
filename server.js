const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json'); // Replace with your Firebase credentials file
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

const transactions = [
  { date: '2023-01-01', category: 'Expense', description: 'Groceries', amount: 50.0 },
  // Add more transactions as needed
];

app.get('/export-csv', (req, res) => {
  const csvWriter = createCsvWriter({
    path: 'transactions.csv',
    header: [
      { id: 'date', title: 'Date' },
      { id: 'category', title: 'Category' },
      { id: 'description', title: 'Description' },
      { id: 'amount', title: 'Amount' },
    ],
  });

  csvWriter.writeRecords(transactions)
    .then(() => {
      const file = `${__dirname}/transactions.csv`;
      res.download(file); // Set appropriate headers and send the file
    })
    .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
