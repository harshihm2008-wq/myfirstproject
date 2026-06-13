const express = require('express');
const Razorpay = require('razorpay');
const Booking = require('../models/Booking');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    const order = await razorpay.orders.create({
      amount: booking.amount * 100,
      currency: 'INR',
      receipt: booking.bookingId,
    });
    booking.razorpayOrderId = order.id;
    await booking.save();
    res.status(201).json({ booking, orderId: order.id, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/confirm-payment', async (req, res) => {
  try {
    const { bookingId, paymentId } = req.body;
    const booking = await Booking.findOneAndUpdate(
      { bookingId },
      { paymentId, paymentStatus: 'paid', status: 'confirmed' },
      { new: true }
    );
    res.json({ booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = status ? { status } : {};
    const bookings = await Booking.find(query).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit);
    const total = await Booking.countDocuments(query);
    res.json({ bookings, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id/status', adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
