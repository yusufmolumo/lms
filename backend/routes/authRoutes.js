const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validationMiddleware');

// Student and Teacher Registration Route
router.post('/register', validateRegistration, authController.register);

// Admin Registration Route
router.post('/admin/register', authController.adminRegister);

// Login Route for all user types
router.post('/login', validateLogin, authController.login);

// Logout Route
router.post('/logout', authController.logout);

// Password Reset Routes
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Email Verification Route
router.get('/verify-email/:token', authController.verifyEmail);

// Check Authentication Status
router.get('/status', authController.checkAuthStatus);

module.exports = router;