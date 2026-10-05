const express = require('express');
const router = express.Router();
const { initializeRegistration, mockPayment, getTicket } = require('../controllers/registrationController');
const { protect } = require('../middleware/auth');

router.post('/init', protect, initializeRegistration);
router.post('/:registrationId/pay', protect, mockPayment);
router.get('/:id/ticket', protect, getTicket);

module.exports = router;
