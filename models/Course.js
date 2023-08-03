const mongoose = require("mongoose");
const schema = mongoose.Schema;
var slugify = require("slugify");

const courseSchema = new schema({
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
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});
courseSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
