const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  banner: { type: String },
  eventType: { type: String, enum: ['Online', 'Offline', 'Hybrid'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  venue: { type: String },
  address: { type: String },
  city: { type: String },
  onlineUrl: { type: String },
  capacity: { type: Number, required: true },
  registrationDeadline: { type: Date },
  ticketPrice: { type: Number, default: 0 },
  teamRegistration: { type: Boolean, default: false },
  minTeamSize: { type: Number, default: 1 },
  maxTeamSize: { type: Number, default: 1 },
  status: { type: String, enum: ['Draft', 'Published', 'Registration Open', 'Registration Closed', 'Live', 'Completed', 'Cancelled'], default: 'Draft' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
