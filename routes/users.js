const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/dashboard', usersController.dashboard);

//call the SignUp page
router.get('/signup', usersController.signup);

//call the SignIn page
router.get('/signin', usersController.signin);

//call the create Account
router.post('/create', bodyParser.urlencoded(), usersController.create);

//call the SignIn session
router.get('/create-session', usersController.createSession);

module.exports = router;