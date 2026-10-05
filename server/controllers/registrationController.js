const Registration = require('../models/Registration');
const Event = require('../models/Event');
const crypto = require('crypto');

exports.initializeRegistration = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    
    // Check if user already registered
    const existing = await Registration.findOne({ event: eventId, participant: req.user._id });
    if (existing && existing.paymentStatus === 'Completed') {
      return res.status(400).json({ success: false, message: 'You are already registered for this event.' });
    }

    // Check capacity
    const currentRegs = await Registration.countDocuments({ event: eventId, paymentStatus: 'Completed' });
    if (currentRegs >= event.capacity) {
      return res.status(400).json({ success: false, message: 'Event is at full capacity.' });
    }

    let registration = existing;
    if (!registration) {
      registration = await Registration.create({
        event: eventId,
        participant: req.user._id,
        amountPaid: event.ticketPrice
      });
    }

    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.mockPayment = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const registration = await Registration.findById(registrationId).populate('event');
    
    if (!registration) return res.status(404).json({ success: false, message: 'Registration not found' });

    // Generate unique Ticket ID EVT-YYYY-RANDOM
    const year = new Date().getFullYear();
    const randomCode = crypto.randomBytes(3).toString('hex').toUpperCase();
    const ticketId = `EVT-${year}-${randomCode}`;

    registration.paymentStatus = 'Completed';
    registration.registrationStatus = 'Confirmed';
    registration.ticketId = ticketId;
    await registration.save();

    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTicket = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('event')
      .populate('participant', 'name email');
      
    if (!registration) return res.status(404).json({ success: false, message: 'Ticket not found' });
    
    // Check ownership or admin/organizer
    if (registration.participant._id.toString() !== req.user.id && req.user.role === 'PARTICIPANT') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
