const express = require('express');
const {
  getRealEstates,
  getRealEstate,
  createRealEstate,
  updateRealEstate,
  deleteRealEstate
} = require('../controllers/real-estate.controller');

const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(getRealEstates)
  .post(authMiddleware, createRealEstate);

router
  .route('/:id')
  .get(getRealEstate)
  .put(authMiddleware, updateRealEstate)
  .delete(authMiddleware, deleteRealEstate);

module.exports = router; 