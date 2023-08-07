const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).redirect("/login");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
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
          console.log(`giriş yapılan kullanıcı : ${req.session.userID}`);
          console.log(`kullanıcı id: ${userIN}`)
          res.status(200).redirect("/");
        }
      });
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
    const user = await User.findOne({ _id:req.session.userID });
    
          res.status(200).render("dashboard",{
            page_name:"dashboard",
            user
          });
        }
       catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

