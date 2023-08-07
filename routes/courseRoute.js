const express = require("express");
const courseControllers = require("../controllers/courseController");
const router = express.Router();
const courseMiddleware = require("../middleware/courseMiddleware");

router
  .route("/")
  .post(courseMiddleware(["teacher", "admin"]), courseControllers.createCourse);

router.route("/").get(courseControllers.getCourses);

router.route("/:slug").get(courseControllers.getCourse);

module.exports = router;
