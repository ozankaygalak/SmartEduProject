const Category = require("../models/Category");
const Course = require('../models/Course');
const User = require('../models/User');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body.category);
    res.status(200).json({
      status: "success",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    await Category.findOneAndRemove({_id:req.params._id});
    
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).redirect('/users/dashboard')
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

