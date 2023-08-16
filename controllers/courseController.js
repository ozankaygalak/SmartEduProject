const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
exports.createCourse = async (req, res) => {
  try {
    await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      teacher: req.session.userID,
    });
    req.flash("success", `Successfully for ${req.body.name}`);
    res.status(201).redirect("/courses");
  } catch (error) {
    req.flash("error", `Unsuccessfully for ${req.body.name}`);
    res.status(400).redirect("/courses");
  }
};

exports.getCourses = async (req, res) => {
  try {
    const slugCategory = req.query.category;
    const category = await Category.findOne({ slug: slugCategory });
    const query = req.query.search;
    let filter = {};

    if (slugCategory) {
      filter = { category: category._id };
    }
    if (query) {
      filter = { name: query };
    }

    if (!query && !slugCategory) {
      (filter.name = ""), (filter.category = null);
    }

    const courses = await Course.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    }).sort("-date");
    const categorys = await Category.find();
    res.status(200).render("courses", {
      courses,
      categorys,
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
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "teacher",
    );
    res.status(200).render("course", {
      course,
      page_name: "courses",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    const courseId = req.body.course_id;

    user.courses.push(courseId);
    await user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    const courseId = req.body.course_id;

    user.courses.pull(courseId);
    await user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.removeCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndRemove({ slug: req.params.slug });
    req.flash("error", `${course.name} silindi..`);
    const usersToUpdate = await User.find({ courses: course._id });
    for (const user of usersToUpdate) {
      user.courses.pull(course._id);
      await user.save();
    }
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug : req.params.slug});
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    course.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
