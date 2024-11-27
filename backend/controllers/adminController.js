import User from '../models/userModel.js';
import Course from '../models/courseModel.js';

// Get All Pending Users
export const getPendingUsers = async (req, res) => {
    try {
        const pendingUsers = await User.find({ status: 'pending' });
        res.status(200).json(pendingUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pending users', error: error.message });
    }
};

// Approve User
export const approveUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(
            userId, 
            { status: 'approved' }, 
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User approved successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error approving user', error: error.message });
    }
};

// Reject User
export const rejectUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User rejected and deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting user', error: error.message });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Create Course (Admin)
export const createCourse = async (req, res) => {
    try {
        const { title, description, instructor } = req.body;
        const newCourse = new Course({
            title,
            description,
            instructor
        });

        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error: error.message });
    }
};