const Course = require("../models/Course");
const Category = require("../models/Category");
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: "success",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const slugCategory = req.query.category;
    const categoryy = await Category.findOne({ slug: slugCategory });

    let filter = {};

    if (slugCategory) {
      filter = { categoryy: categoryy._id };
    }

    const courses = await Course.find(filter);
    const category = await Category.find();
    res.status(200).render("courses", {
      courses,
      category,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    res.status(200).render("course", {
      course,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
