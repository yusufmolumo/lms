const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  questions: [{
    type: String,
    required: true
  }]
});

module.exports = mongoose.model('Test', testSchema);
