const express = require('express');
const router  = express.Router();
const Review  = require('../models/Review');

// Simple admin password check middleware
const adminAuth = (req, res, next) => {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }
  next();
};

// GET /api/admin/reviews — get all reviews (including unapproved)
router.get('/reviews', adminAuth, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/admin/reviews/:id — delete a review
router.delete('/reviews/:id', adminAuth, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Review deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/admin/reviews/:id/toggle — approve/unapprove
router.patch('/reviews/:id/toggle', adminAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    review.approved = !review.approved;
    await review.save();
    res.json({ success: true, approved: review.approved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
