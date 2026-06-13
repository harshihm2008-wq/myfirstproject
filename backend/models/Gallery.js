const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  category: { type: String, enum: ['play-zones', 'birthday', 'activities', 'general'], default: 'general' },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
