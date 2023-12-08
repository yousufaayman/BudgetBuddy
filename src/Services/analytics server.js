app.get('/user/getTotalIncome/:userID', async (req, res) => {
    try {
      const { userID } = req.params;
  
      // Retrieve user's transactions
      const userTransactionsRef = admin.firestore().collection('users').doc(userID).collection('user_transactions');
      const snapshot = await userTransactionsRef.get();
  
      // Calculate total income
      let totalIncome = 0;
      snapshot.forEach((doc) => {
        const transaction = doc.data();
        if (transaction.type === 'income') {
          totalIncome += parseFloat(transaction.amount);
        }
      });
  
      // Round the total income to two decimal places
      totalIncome = parseFloat(totalIncome.toFixed(2));
  
      res.status(200).json({
        totalIncome,
      });
    } catch (error) {
      console.error('Error retrieving total income:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  app.get('/user/getTotalExpense/:userID', async (req, res) => {
    try {
      const { userID } = req.params;
  
      // Retrieve user's transactions
      const userTransactionsRef = admin.firestore().collection('users').doc(userID).collection('user_transactions');
      const snapshot = await userTransactionsRef.get();
  
      // Calculate total expense
      let totalExpense = 0;
      snapshot.forEach((doc) => {
        const transaction = doc.data();
        if (transaction.type === 'expense') {
          totalExpense += parseFloat(transaction.amount);
        }
      });
  
      // Round the total expense to two decimal places
      totalExpense = parseFloat(totalExpense.toFixed(2));
  
      res.status(200).json({
        totalExpense,
      });
    } catch (error) {
      console.error('Error retrieving total expense:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });