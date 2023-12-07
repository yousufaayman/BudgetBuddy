const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('src\firebaseConfig.js'); // Firebase credentials file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const serviceAccount = require('./firebase-admin-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: '', // replace with firebase url
});


const app = express();
app.use(cors());
app.use(bodyParser.json());


// create categories
app.post('/api/categories', async (req, res) => {
  try {
    const { name, icon } = req.body;
    const categoriesRef = admin.database().ref('categories');
    const newCategory = await categoriesRef.push({
      name,
      icon,
    });
    res.status(201).json({ id: newCategory.key });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
 
// get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categoriesRef = admin.database().ref('categories');
    const snapshot = await categoriesRef.once('value');
    const categories = snapshot.val();
    res.status(200).json(categories || {});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// update category
app.put('/api/categories/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const { name, icon } = req.body;

    const categoryRef = admin.database().ref(`categories/${categoryId}`);
    const categorySnapshot = await categoryRef.once('value');
    const categoryData = categorySnapshot.val();

    // check if category exists
    if (!categoryData) {
      return res.status(404).send('Category not found');
    }

    // update category in firebase
    await categoryRef.update({
      name: name || categoryData.name,
      icon: icon || categoryData.icon,
    });

    res.status(200).send('Category updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// delete category
app.delete('/api/categories/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // check if category exists
    const categoryRef = admin.database().ref(`categories/${categoryId}`);
    const categorySnapshot = await categoryRef.once('value');
    const categoryData = categorySnapshot.val();

    if (!categoryData) {
      return res.status(404).send('Category not found');
    }

    // delete category in firebase
    await categoryRef.remove();

    // re-categorizing or mark transaction as unassigned

    res.status(200).send('Category deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



app.get('/api/balances', (req, res) => {
  // Fetch balances data from Firebase Realtime Database
  balancesRef.once('value', (snapshot) => {
    const balances = snapshot.val();
    res.json(balances);
  });
});



// Endpoint to handle budget calculation
app.post('/api/budget', (req, res) => {
  try {
    const { monthlyIncome, selectedMethod } = req.body;

    if (!monthlyIncome || !selectedMethod) {
      return res.status(400).json({ error: 'Invalid request. Please provide monthly income and selected budgeting method.' });
    }

    // Perform budget calculation based on the selected budgeting method
    let allocatedBudget = {};
    switch (selectedMethod) {
      case '50/30/20':
        allocatedBudget = {
          necessities: 0.5 * monthlyIncome,
          wants: 0.3 * monthlyIncome,
          savings: 0.2 * monthlyIncome,
        };
        break;
      case '70/30':
        allocatedBudget = {
          necessities: 0.7 * monthlyIncome,
          wants: 0.3 * monthlyIncome,
          savings: 0,
        };
        break;
      case '40/30/30':
        allocatedBudget = {
          necessities: 0.4 * monthlyIncome,
          wants: 0.3 * monthlyIncome,
          savings: 0.3 * monthlyIncome,
        };
        break;
      case '40/30/20/10':
        allocatedBudget = {
          necessities: 0.4 * monthlyIncome,
          wants: 0.3 * monthlyIncome,
          savings: 0.2 * monthlyIncome,
          other: 0.1 * monthlyIncome,
        };
        break;
      default:
        return res.status(400).json({ error: 'Invalid budgeting method selected.' });
    }

    res.status(200).json({ allocatedBudget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  // Add recurring expenses to necessities
  necessities += recurringExpenses.reduce((acc, expense) => acc + expense.amount, 0);

  // Save the calculated budget to the Firebase Realtime Database
  const calculatedBudget = { necessities, wants, savings, investments };
  admin.database().ref(`/users/${userId}/budget`).set(calculatedBudget);

  res.json({ success: true, message: 'Budget calculated and saved successfully.' });
});


// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



