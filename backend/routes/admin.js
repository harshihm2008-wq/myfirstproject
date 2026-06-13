const express = require('express');
const Booking = require('../models/Booking');
const Membership = require('../models/Membership');
const User = require('../models/User');
const { adminAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/analytics', adminAuth, async (req, res) => {
  try {
    const [totalBookings, confirmedBookings, totalMemberships, activeMemberships, totalUsers] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'confirmed' }),
      Membership.countDocuments(),
      Membership.countDocuments({ status: 'active' }),
      User.countDocuments({ role: 'user' }),
    ]);

    const revenueData = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const membershipRevenue = await Membership.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalBookings,
      confirmedBookings,
      totalMemberships,
      activeMemberships,
      totalUsers,
      bookingRevenue: revenueData[0]?.total || 0,
      membershipRevenue: membershipRevenue[0]?.total || 0,
      recentBookings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
