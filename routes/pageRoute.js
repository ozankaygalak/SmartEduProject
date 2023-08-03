const express = require('express');
const pageControllers = require('../controllers/pageControllers');
const router = express.Router();

router.route('/').get(pageControllers.getIndexPage);

router.route('/about').get(pageControllers.getAboutPage);

router.route('/contact').get(pageControllers.getContactPage);

router.route('/regist').get(pageControllers.getUser);

router.route('/login').get(pageControllers.getLoginUser);

module.exports = router;