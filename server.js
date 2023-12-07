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

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



