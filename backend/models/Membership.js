const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  plan: { type: String, enum: ['monthly', 'quarterly', 'yearly'], required: true },
  numberOfKids: { type: Number, required: true },
  amount: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
  paymentId: { type: String },
  razorpaySubscriptionId: { type: String },
  benefits: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);
