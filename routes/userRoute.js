const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const middleware = require("../middleware/dashMiddleware");
const { body } = require("express-validator");
const User = require("../models/User");

//router.route('/').post(pageController.createCategory);
router.route("/signup").post(
  [
    body("name").not().isEmpty().withMessage("Lütfen ad kısmını doldurunuz"),

    body("email")
      .isEmail()
      .withMessage("Lütfen geçerli e-mail adınızı giriniz")
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject("Email already exist!");
          }
        });
      }),

    body("password")
      .not()
      .isEmpty()
      .withMessage("Lütfen mevcut şifrenizi giriniz"),
  ],
  authController.createUser,
);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logout);
router.route("/dashboard").get(middleware, authController.getDashboard);
router.route("/:id").delete(authController.deleteUser);
module.exports = router;
