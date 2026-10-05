const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ticketId: { type: String, unique: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  registrationStatus: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
  amountPaid: { type: Number, default: 0 },
  checkedIn: { type: Boolean, default: false },
  checkedInAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);
