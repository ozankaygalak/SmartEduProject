const User = require("../models/User");
const Category = require("../models/Category")
const Course = require('../models/Course');
const bcrypt = require("bcrypt");
const {validationResult } = require('express-validator');

exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).redirect("/login");
  } catch (error) {
    const result = validationResult(req);
    console.log(result);
    console.log(result.array()[0].msg)
    for(let i = 0; i<result.array();i++){
      req.flash("error", `Error for ${result.array()[i].msg}`);
    }
    
    res.status('400').redirect('/register')
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.userID = user._id;
          res.status(200).redirect("/");
        }else{
          req.flash('error','Geçerli şifreyi giriniz');
          res.status(400).redirect("/login");
        }
      });
    }else{req.flash('error','Kullanıcı bulunamamaktadır');
    res.status(400).redirect("/login");
  }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};


exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findOne({ _id:req.session.userID }).populate('courses');
    const category = await Category.find();
    const courses = await Course.find({teacher:req.session.userID});
    const users = await User.find();
          res.status(200).render("dashboard",{
            page_name:"dashboard",
            user,
            category,
            courses,
            users
          });
        }
       catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {    

    await User.findByIdAndRemove(req.params.id)
    await Course.deleteMany({user:req.params.id})

    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
