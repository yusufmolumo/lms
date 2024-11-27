import Course from '../models/courseModel.js';
import Test from '../models/testModel.js';
import Grade from '../models/gradeModel.js';
import User from '../models/userModel.js';

// Create Course
export const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newCourse = new Course({
            title,
            description,
            instructor: req.user.id
        });

        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error: error.message });
    }
};

// Create Test
export const createTest = async (req, res) => {
    try {
        const { courseId, title, questions } = req.body;
        
        const newTest = new Test({
            course: courseId,
            title,
            questions,
            teacher: req.user.id
        });

        await newTest.save();
        res.status(201).json({ message: 'Test created successfully', test: newTest });
    } catch (error) {
        res.status(500).json({ message: 'Error creating test', error: error.message });
    }
};

// Grade Student Test
export const gradeTest = async (req, res) => {
    try {
        const { testId, studentId, score } = req.body;

        const newGrade = new Grade({
            test: testId,
            student: studentId,
            score
        });

        await newGrade.save();
        res.status(201).json({ message: 'Test graded successfully', grade: newGrade });
    } catch (error) {
        res.status(500).json({ message: 'Error grading test', error: error.message });
    }
};

// Get All Students
export const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }).select('-password');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};

// Get Teacher's Courses
export const getTeacherCourses = async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.user.id });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
};