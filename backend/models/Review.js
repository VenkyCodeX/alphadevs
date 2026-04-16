const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true, maxlength: 100 },
  role:    { type: String, trim: true, maxlength: 100, default: 'Client' },
  message: { type: String, required: true, trim: true, maxlength: 1000 },
  rating:  { type: Number, required: true, min: 1, max: 5 },
  approved:{ type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
