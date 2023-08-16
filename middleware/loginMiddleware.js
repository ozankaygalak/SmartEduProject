const User = require("../models/User");

exports.login = async (req, res, next) => {
  const user = await User.findById(req.session.userID).exec();
    if (user) {
      return res.redirect("/");
    }
    next();
};
