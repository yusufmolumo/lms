import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: [true, 'Test is required']
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Student is required']
    },
    score: {
        type: Number,
        required: [true, 'Score is required'],
        min: [0, 'Score cannot be negative'],
        max: [100, 'Score cannot exceed 100']
    },
    gradedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    feedback: {
        type: String,
        trim: true,
        maxlength: [500, 'Feedback cannot exceed 500 characters']
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Graded', 'Reviewed'],
        default: 'Pending'
    },
    attempts: {
        type: Number,
        default: 1,
        min: [1, 'Minimum attempts is 1']
    }
}, {
    timestamps: true
});

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;