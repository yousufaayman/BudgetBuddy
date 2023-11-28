// routes/reports.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');

// @route GET api/reports/general
// @desc Get a general report for the user
// @access Private
router.get('/general', auth, async (req, res) => {
  try {
    // Aggregate transaction data into a report format
    // This is a simplified example. You would customize the aggregation to your needs.
    const reportData = await Transaction.aggregate([
      { $match: { user: req.user.id } },
      { $group: {
        _id: null,
        totalIncome: { $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] } },
        totalExpense: { $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] } },
        balance: { $last: '$balance' }, // Assuming you store the balance on each transaction
      }},
      { $project: { _id: 0 } }
    ]);

    res.json(reportData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
