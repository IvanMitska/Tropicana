const express = require('express');
const router = express.Router();
const { 
  checkAvailability,
  calculatePrice,
  createBooking,
  createPaymentSession,
  verifyPayment,
  getBooking,
  getUserBookings,
  cancelBooking,
  saveDraft
} = require('../controllers/booking.controller');

const { authMiddleware, optionalAuthMiddleware } = require('../middleware/auth.middleware');

// Публичные маршруты
router.post('/check-availability', checkAvailability);
router.post('/calculate-price', calculatePrice);

// Маршруты с опциональной авторизацией (работают и для гостей)
router.post('/', optionalAuthMiddleware, createBooking);
router.post('/draft', optionalAuthMiddleware, saveDraft);
router.get('/:id', optionalAuthMiddleware, getBooking);
router.post('/:id/payment', optionalAuthMiddleware, createPaymentSession);
router.get('/verify-payment/:sessionId', optionalAuthMiddleware, verifyPayment);
router.put('/:id/cancel', optionalAuthMiddleware, cancelBooking);

// Маршруты, требующие авторизации
router.get('/', authMiddleware, getUserBookings);

module.exports = router; 