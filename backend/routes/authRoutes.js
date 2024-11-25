const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User login
router.post('/login', authController.login);

// User signup
router.post('/signup', authController.signup);

module.exports = router;
