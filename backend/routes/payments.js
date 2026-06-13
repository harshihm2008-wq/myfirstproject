const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    const order = await razorpay.orders.create({ amount: amount * 100, currency, receipt });
    res.json({ orderId: order.id, keyId: process.env.RAZORPAY_KEY_ID, amount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex');
  if (expectedSignature === razorpay_signature) {
    res.json({ verified: true });
  } else {
    res.status(400).json({ verified: false, message: 'Payment verification failed' });
  }
});

module.exports = router;
