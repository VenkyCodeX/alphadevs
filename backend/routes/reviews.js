const express = require('express');
const router  = express.Router();
const Review  = require('../models/Review');
const { contactLimiter } = require('../middleware/rateLimiter');

// GET /api/reviews — fetch all approved reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true })
      .sort({ createdAt: -1 })
      .select('name role message rating createdAt');
    res.json({ success: true, data: reviews });
  } catch (err) {
    console.error('Reviews fetch error:', err);
    res.status(500).json({ success: false, message: 'Failed to load reviews.' });
  }
});

// POST /api/reviews — submit a new review
router.post('/', contactLimiter, async (req, res) => {
  const { name, role, message, rating } = req.body;

  if (!name?.trim() || !message?.trim())
    return res.status(400).json({ success: false, message: 'Name and message are required.' });

  const r = parseInt(rating);
  if (!r || r < 1 || r > 5)
    return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5.' });

  try {
    const review = await Review.create({
      name:    name.trim(),
      role:    role?.trim() || 'Client',
      message: message.trim(),
      rating:  r,
    });
    res.status(201).json({ success: true, message: 'Review submitted!', data: review });
  } catch (err) {
    console.error('Review submit error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit review.' });
  }
});

module.exports = router;
