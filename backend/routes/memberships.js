const express = require('express');
const Razorpay = require('razorpay');
const Membership = require('../models/Membership');
const { adminAuth } = require('../middleware/auth');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PLANS = {
  monthly: { amount: 1499, days: 30, benefits: ['Unlimited visits for 30 days', '1 child included', 'Priority booking', '10% birthday discount'] },
  quarterly: { amount: 3999, days: 90, benefits: ['Unlimited visits for 90 days', 'Up to 2 children', 'Priority booking', '15% birthday discount', 'Free snack voucher'] },
  yearly: { amount: 12999, days: 365, benefits: ['Unlimited visits for 365 days', 'Up to 3 children', 'VIP priority booking', '20% birthday discount', 'Monthly free snack', 'Exclusive member events'] },
};

router.post('/', async (req, res) => {
  try {
    const { parentName, email, phone, plan, numberOfKids } = req.body;
    const planData = PLANS[plan];
    if (!planData) return res.status(400).json({ message: 'Invalid plan' });
    const endDate = new Date(Date.now() + planData.days * 86400000);
    const membership = await Membership.create({ parentName, email, phone, plan, numberOfKids, amount: planData.amount, endDate, benefits: planData.benefits });
    const order = await razorpay.orders.create({ amount: planData.amount * 100, currency: 'INR', receipt: membership._id.toString() });
    res.status(201).json({ membership, orderId: order.id, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/plans', (req, res) => res.json(PLANS));

router.get('/', adminAuth, async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.json(memberships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
