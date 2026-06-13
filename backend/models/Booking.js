const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true },
  parentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  numberOfKids: { type: Number, required: true, min: 1 },
  kidsAges: [{ type: String }],
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  packageType: { type: String, enum: ['general', 'silver', 'gold', 'platinum', 'custom'], default: 'general' },
  specialRequests: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
  paymentId: { type: String },
  razorpayOrderId: { type: String },
  isBirthday: { type: Boolean, default: false },
}, { timestamps: true });

bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    this.bookingId = 'GKP' + Date.now().toString().slice(-8);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
