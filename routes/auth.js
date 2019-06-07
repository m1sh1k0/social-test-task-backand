var express = require('express');
var router = express.Router();
var signupController = require('../controllers/auth')
var UserController = require('../controllers/user')

var router = express.Router();

// registration
router.post("/signup", signupController.signUp);

// login
router.post("/signin", signupController.signIn);

//signout 
router.get("/signout", signupController.signOut);


// get any user if has user
router.param("UserId", UserController.userById);


module.exports = router;
