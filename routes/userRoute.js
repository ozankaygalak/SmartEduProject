const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const middleware = require("../middleware/dashMiddleware")

//router.route('/').post(pageController.createCategory);
router.route("/signup").post(authController.createUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logout);
router.route("/dashboard").get(middleware, authController.getDashboard);
module.exports = router;
