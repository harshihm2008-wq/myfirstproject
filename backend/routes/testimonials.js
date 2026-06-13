const express = require('express');
const Testimonial = require('../models/Testimonial');
const { adminAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ isFeatured: -1, createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const t = await Testimonial.create(req.body);
    res.status(201).json(t);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(t);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
