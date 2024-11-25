const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Teacher routes (e.g., managing tests and grades)
router.get('/dashboard', teacherController.getDashboard);

module.exports = router;
