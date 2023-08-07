const express = require('express');
const pageControllers = require('../controllers/pageControllers');
const router = express.Router();
const loginMiddleware = require("../middleware/loginMiddleware")

router.route('/').get(pageControllers.getIndexPage);

router.route('/about').get(pageControllers.getAboutPage);

router.route('/contact').get(pageControllers.getContactPage);

router.route('/register').get(loginMiddleware.login, pageControllers.getUser);

router.route('/login').get(loginMiddleware.login, pageControllers.getLoginUser);

module.exports = router;