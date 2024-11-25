const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin routes (e.g., managing users and courses)
router.get('/dashboard', adminController.getDashboard);

module.exports = router;
