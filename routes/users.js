const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication , usersController.profile);
router.get('/dashboard', usersController.dashboard);

//call the SignUp page
router.get('/signup', usersController.signup);

//call the SignIn page
router.get('/signin', usersController.signin);

//call the create Account
router.post('/create', bodyParser.urlencoded(), usersController.create);

//call the SignIn session
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
),usersController.createSession);

//delete session
router.post('/delete-session', usersController.deleteSession);

module.exports = router;