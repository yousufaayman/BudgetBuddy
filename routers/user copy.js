const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    type: String, 
    default: ''
  },

});

module.exports = User = mongoose.model('users', UserSchema);

///////////////// real-time balance ////////////////

const userSchema = new mongoose.Schema({
  
  balance: {
    type: Number,
    default: 0, 
  },

});
