const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

const mongoose = require('mongoose');

// Replace '<username>:<password>@<your-database-url>' with your actual MongoDB URI
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  const users = require('./routes/users');

// Use Routes
app.use('/api/users', users);
