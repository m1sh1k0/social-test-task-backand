var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var signupController = require('../controllers/auth')

/* GET home page whit all pposts */
router.get('/', signupController.requireSignIn, function(req, res, next) {
  var posts = Post.find()
  .select('_id title body')
  .then (posts => {
    res.status(200).json({posts})
  })
  .catch(err => console.log(err));
  
});

module.exports = router;
