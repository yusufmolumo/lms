import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
        minlength: [3, 'Course title must be at least 3 characters long'],
        maxlength: [100, 'Course title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
        trim: true,
        minlength: [10, 'Course description must be at least 10 characters long']
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Instructor is required']
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    modules: [{
        title: String,
        content: String,
        resources: [{
            name: String,
            url: String
        }]
    }],
    category: {
        type: String,
        enum: ['Technology', 'Science', 'Mathematics', 'Literature', 'History', 'Other'],
        default: 'Other'
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    enrollmentCap: {
        type: Number,
        default: 50,
        min: [1, 'Enrollment cap must be at least 1']
    },
    status: {
        type: String,
        enum: ['Draft', 'Published', 'Archived'],
        default: 'Draft'
    },
    prerequisites: [String],
    duration: {
        type: Number, // Duration in weeks
        min: [1, 'Course duration must be at least 1 week']
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

export default Course;