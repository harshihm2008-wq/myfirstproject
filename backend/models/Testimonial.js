const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  avatarUrl: { type: String },
  source: { type: String, enum: ['google', 'facebook', 'direct'], default: 'google' },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
