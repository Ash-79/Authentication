const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/admin', require('./admin'));
router.use('/posts', require('./post'));
router.use('/comment', require('./comments'));

module.exports = router;