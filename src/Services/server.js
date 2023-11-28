app.post('/api/generateReport', async (req, res) => {
    try {
      //  Fetch data from Firebase Firestore ////
      const usersSnapshot = await admin.firestore().collection('users').get();
      const users = usersSnapshot.docs.map(doc => doc.data());
  
      // Process and format the data ////
      const report = {
        timestamp: new Date().toISOString(),
        userCount: users.length,
        users: users
      };
  
      // Send the report ////
      res.json(report);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  