import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Test title is required'],
        trim: true,
        minlength: [3, 'Test title must be at least 3 characters long']
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Course is required']
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Teacher is required']
    },
    questions: [{
        type: {
            type: String,
            enum: ['multiple-choice', 'true-false', 'short-answer'],
            required: true
        },
        question: {
            type: String,
            required: [true, 'Question text is required']
        },
        options: [String],
        correctAnswer: {
            type: String,
            required: [true, 'Correct answer is required']
        },
        points: {
            type: Number,
            default: 1,
            min: [0, 'Points must be a positive number']
        }
    }],
    maxScore: {
        type: Number,
        required: [true, 'Maximum test score is required']
    },
    duration: {
        type: Number, // Duration in minutes
        required: [true, 'Test duration is required'],
        min: [5, 'Minimum test duration is 5 minutes']
    },
    startDate: {
        type: Date,
        required: [true, 'Test start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'Test end date is required']
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Active', 'Completed', 'Canceled'],
        default: 'Scheduled'
    }
}, {
    timestamps: true
});

const Test = mongoose.model('Test', testSchema);

export default Test;