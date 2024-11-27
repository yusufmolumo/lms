const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to ensure only students can access these routes
router.use(authMiddleware.requireStudent);

// Route to get available courses
router.get('/courses', studentController.getAvailableCourses);

// Route to enroll in a course
router.post('/courses/enroll/:courseId', studentController.enrollInCourse);

// Route to get enrolled courses
router.get('/my-courses', studentController.getEnrolledCourses);

// Route to access course materials
router.get('/course/:courseId/materials', studentController.getCourseMaterials);

// Route to take a quiz
router.get('/quiz/:quizId', studentController.startQuiz);
router.post('/quiz/:quizId/submit', studentController.submitQuiz);

// Route to view quiz/test results
router.get('/results', studentController.getResults);

// Route to view personal profile
router.get('/profile', studentController.getProfile);
router.put('/profile', studentController.updateProfile);

// Route to view grades
router.get('/grades', studentController.getGrades);

module.exports = router;