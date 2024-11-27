const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to ensure only admin can access these routes
router.use(authMiddleware.requireAdmin);

// Route to get all users (students and teachers)
router.get('/users', adminController.getAllUsers);

// Route to approve/reject user registration
router.post('/users/approve/:userId', adminController.approveUser);
router.post('/users/reject/:userId', adminController.rejectUser);

// Route to delete a user
router.delete('/users/:userId', adminController.deleteUser);

// Route to update user details
router.put('/users/:userId', adminController.updateUser);

// Route to get platform statistics
router.get('/stats', adminController.getPlatformStats);

// Route to manage courses
router.post('/courses', adminController.createCourse);
router.put('/courses/:courseId', adminController.updateCourse);
router.delete('/courses/:courseId', adminController.deleteCourse);

// Route to manage platform settings
router.post('/settings', adminController.updatePlatformSettings);

// Route to view pending registrations
router.get('/pending-registrations', adminController.getPendingRegistrations);

module.exports = router;