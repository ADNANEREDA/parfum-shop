const express = require('express');
const Newsletter = require('../models/Newsletter');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    const existingEmail = await Newsletter.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const newSubscriber = await Newsletter.create({ email });

    res.status(201).json({ message: 'Successfully subscribed!', data: newSubscriber });
  } catch (error) {
    console.error("❌ Erreur Backend Newsletter :", error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;