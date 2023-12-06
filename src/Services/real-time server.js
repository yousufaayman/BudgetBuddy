app.get('/user/getBalance/:userID', async (req, res) => {
    try {
      const userID = req.params.userID;
  
      const userTransactionsRef = admin.firestore().collection('users').doc(userID).collection('user_transactions');
      const snapshot = await userTransactionsRef.get();
  
      if (snapshot.empty) {
        return res.status(200).json({
          hasBalance: false,
          balance: 0,
        });
      }
  
      let balance = 0;
      snapshot.forEach((doc) => {
        const transaction = doc.data();
        if (transaction.type === 'income') {
          balance += parseFloat(transaction.amount); 
        } else if (transaction.type === 'expense') {
          balance -= parseFloat(transaction.amount); 
        }
      });
  
      balance = parseFloat(balance.toFixed(2));
  
      res.status(200).json({
        hasBalance: true,
        balance,
      });
    } catch (error) {
      console.error('Error retrieving balance:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  