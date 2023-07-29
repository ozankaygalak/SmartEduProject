const mongoose = require("mongoose");
const schema = mongoose.Schema;

const courseSchema = new schema( {
  name: {
    required: true,
    unique: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('Course',courseSchema);
module.exports = Course;
