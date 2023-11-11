// routes/notifications.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // if we made auth middleware
const Notification = require('../models/notification');


router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ date: -1 });
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/', auth, async (req, res) => {
  try {
    const newNotification = new Notification({
      user: req.user.id,
      message: req.body.message,
    });

    const notification = await newNotification.save();
    res.json(notification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
