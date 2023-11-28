// POST api/transactions/add
router.post('/add', auth, async (req, res) => {
    const { amount, type } = req.body;
    try {
      const user = await User.findById(req.user.id);
      const newTransaction = new Transaction({
        user: req.user.id,
        amount,
        type,
      });
  
      // Save the transaction
      await newTransaction.save();
  
      // Update user's balance depending on the transaction type
      if (type === 'income') {
        user.balance += amount;
      } else if (type === 'expense') {
        user.balance -= amount;
      }
  
      await user.save();
  
      res.json({ balance: user.balance });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  /////////////////////// expences ////////////////////

// @route GET api/analytics/expenses-over-time
// @desc Get expenses over time
// @access Private
router.get('/expenses-over-time', auth, async (req, res) => {
  try {
    const expensesOverTime = await Transaction.aggregate([
      { $match: { user: req.user.id, type: 'expense' } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalAmount: { $sum: '$amount' }
        }
      },
      { $sort: { '_id': 1 } } // Sort by date ascending
    ]);

    res.json(expensesOverTime);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

  
