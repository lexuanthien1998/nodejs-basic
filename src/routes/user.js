const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/register', userController.registerUser);
router.post('/register', userController.postRegisterUser);

// router.get('/login', userController.loginUser);
// router.post('/login', passport.authenticate('local',{ successRedirect : '/post', failureRedirect: '/user/login', failureFlash : true }));

module.exports = router;