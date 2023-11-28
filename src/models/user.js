const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String, // URL to the image
    default: ''
  },
  // Add any other profile fields you need
});

module.exports = User = mongoose.model('users', UserSchema);

///////////////// real-time balance ////////////////

const userSchema = new mongoose.Schema({
  // ... other fields ...
  balance: {
    type: Number,
    default: 0, // Starts with a zero balance
  },
  // ... other fields ...
});
