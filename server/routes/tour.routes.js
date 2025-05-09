const express = require('express');
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourCategories,
  getFeaturedTours,
  checkTourAvailability
} = require('../controllers/tour.controller');

const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// Маршруты для категорий и популярных экскурсий
router.get('/categories', getTourCategories);
router.get('/featured', getFeaturedTours);

// Маршрут для проверки доступности экскурсии
router.get('/availability/:id', checkTourAvailability);

// Основные маршруты экскурсий
router
  .route('/')
  .get(getTours)
  .post(authMiddleware, createTour);

router
  .route('/:id')
  .get(getTour)
  .put(authMiddleware, updateTour)
  .delete(authMiddleware, deleteTour);

module.exports = router; 