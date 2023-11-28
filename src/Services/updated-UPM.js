// Update Name ////
app.post('/api/updateName', authenticate, async (req, res) => {
    const { uid, newName } = req.body;
    try {
      await admin.auth().updateUser(uid, { displayName: newName });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Update Password //////
  app.post('/api/updatePassword', authenticate, async (req, res) => {
    const { uid, newPassword } = req.body;
    try {
      await admin.auth().updateUser(uid, { password: newPassword });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  /// Update Profile Picture ////
  app.post('/api/updateProfilePicture', authenticate, async (req, res) => {
    const { uid, newPictureUrl } = req.body;
    try {
      await admin.auth().updateUser(uid, { photoURL: newPictureUrl });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });