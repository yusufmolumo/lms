const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Student routes (e.g., viewing courses and grades)
router.get('/dashboard', studentController.getDashboard);

module.exports = router;
