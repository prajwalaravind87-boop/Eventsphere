const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getEvents)
  .post(protect, authorize('ORGANIZER', 'ADMIN'), createEvent);

router.route('/:id')
  .get(getEvent)
  .put(protect, authorize('ORGANIZER', 'ADMIN'), updateEvent)
  .delete(protect, authorize('ORGANIZER', 'ADMIN'), deleteEvent);

module.exports = router;
