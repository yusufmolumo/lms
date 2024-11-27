const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to ensure only teachers can access these routes
router.use(authMiddleware.requireTeacher);

// Course Management Routes
router.post('/courses', teacherController.createCourse);
router.put('/courses/:courseId', teacherController.updateCourse);
router.delete('/courses/:courseId', teacherController.deleteCourse);

// Course Material Routes
router.post('/courses/:courseId/materials', teacherController.addCourseMaterial);
router.put('/materials/:materialId', teacherController.updateCourseMaterial);
router.delete('/materials/:materialId', teacherController.deleteCourseMaterial);

// Quiz/Test Management Routes
router.post('/quiz', teacherController.createQuiz);
router.put('/quiz/:quizId', teacherController.updateQuiz);
router.delete('/quiz/:quizId', teacherController.deleteQuiz);

// Grading Routes
router.get('/students', teacherController.getAllStudents);
router.get('/students/:courseId', teacherController.getStudentsInCourse);
router.post('/grade', teacherController.gradeStudent);

// Teacher Profile Routes
router.get('/profile', teacherController.getProfile);
router.put('/profile', teacherController.updateProfile);

// Student Performance Routes
router.get('/performance', teacherController.getStudentPerformance);
router.get('/course/:courseId/performance', teacherController.getCoursePerformance);

module.exports = router;