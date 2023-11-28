const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // Add any other fields you need, like category, notes, etc.
});

module.exports = Transaction = mongoose.model('Transaction', TransactionSchema);

////////////////// expences ///////////////

// routes/analytics.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('./Transaction');

// @route GET api/analytics/expenses-by-category
// @desc Get expenses aggregated by category
// @access Private
router.get('/expenses-by-category', auth, async (req, res) => {
  try {
    const expensesByCategory = await Transaction.aggregate([
      { $match: { user: req.user.id, type: 'expense' } },
      { $group: { _id: '$category', totalAmount: { $sum: '$amount' } } },
      { $sort: { totalAmount: -1 } } // Optional: sort by the total amount descending
    ]);

    res.json(expensesByCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

