const express = require("express");
const courseControllers = require("../controllers/courseController");
const router = express.Router();
const courseMiddleware = require("../middleware/courseMiddleware");

router
  .route("/")
  .post(courseMiddleware(["teacher", "admin"]), courseControllers.createCourse);

router.route("/").get(courseControllers.getCourses);

router.route("/:slug").get(courseControllers.getCourse);

router.route("/enroll").post(courseControllers.enrollCourse);

router.route("/release").post(courseControllers.releaseCourse);

router.route("/:slug").delete(courseControllers.removeCourse);

router.route("/:slug").put(courseControllers.updateCourse);



module.exports = router;
