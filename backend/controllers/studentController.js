import Course from '../models/courseModel.js';
import Test from '../models/testModel.js';
import Grade from '../models/gradeModel.js';

// Enroll in Course
export const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if already enrolled
        if (course.students.includes(req.user.id)) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        course.students.push(req.user.id);
        await course.save();

        res.status(200).json({ message: 'Successfully enrolled in course', course });
    } catch (error) {
        res.status(500).json({ message: 'Error enrolling in course', error: error.message });
    }
};

// Get Available Courses
export const getAvailableCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor', 'username');
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
};

// Take Test
export const takeTest = async (req, res) => {
    try {
        const { testId, answers } = req.body;
        const test = await Test.findById(testId);

        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        let score = 0;
        test.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });

        const gradePercentage = (score / test.questions.length) * 100;

        const newGrade = new Grade({
            test: testId,
            student: req.user.id,
            score: gradePercentage
        });

        await newGrade.save();

        res.status(200).json({ 
            message: 'Test submitted successfully', 
            score: gradePercentage,
            grade: newGrade 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error taking test', error: error.message });
    }
};

// Get Student Grades
export const getStudentGrades = async (req, res) => {
    try {
        const grades = await Grade.find({ student: req.user.id })
            .populate('test', 'title')
            .populate('test.course', 'title');

        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching grades', error: error.message });
    }
};