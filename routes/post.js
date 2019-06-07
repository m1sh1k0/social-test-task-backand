var express = require('express');
var router = express.Router();
var postController = require('../controllers/post')
var signupController = require('../controllers/auth')


//creating a post route
router.post("/post", signupController.requireSignIn, postController.createPost);


module.exports = router;
