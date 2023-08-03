const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

//router.route('/').post(pageController.createCategory);
router.route("/signup").post(authController.createUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").post(authController.logout);
module.exports = router;
