app.get('/userProfile/:userID', async (req, res) => {
    try {
      const uid = req.params.userID;
  
      // Fetch user profile from Firestore
      const userRef = admin.firestore().collection('users').doc(uid);
      const snapshot = await userRef.get();
  
      if (snapshot.exists) {
        const userData = snapshot.data();
        res.status(200).json(userData);
      } else {
        res.status(500).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/updateProfile/:userID', async (req, res) => {
    try {
      const uid = req.params.userID;
      const { firstName, lastName } = req.body; 
  
      // Update user profile in Firestore
      const userRef = admin.firestore().collection('users').doc(uid);
      await userRef.update({
        firstName,
        lastName
      });
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  