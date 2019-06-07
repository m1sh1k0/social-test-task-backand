var User = require('../models/user');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
require('dotenv').config();

exports.signUp = async (req, res) => {
    var userExist = await User.findOne({email: req.body.email})
    if(userExist) return res.status(403).json({
        error: "username/email is alredy used"
    })

    var user = await new User(req.body)
    await user.save()
    res.status(200).json({message: "sign up succesfull, u can login now "})
}

exports.signIn = (req, res) => {
    // finding user
    var {email, password} = req.body
    User.findOne({email}, (err, user) => {
        // if error or no user found 
        if(err || !user) {
            return res.status(401).json({
                error: "user with this email does not exist. Signin ! "
            })
        }
        // match email an password
        // user model chema new method 
        if (!user.authenticate(password)){
            return res.status(401).json({
                error: "email and psswrd dont mathc "
            })
        }
        // generate token for user ---- id and env secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        // expire cockie date
        res.cookie("t", token, {expire: new Date() + 5555 })
        // return response with user nd token to frontend
        var {_id, name, email} = user
        return res.json({token, user: {_id, email, name}})
    })
}

exports.signOut = (req, res) => { 
    res.clearCookie("t");
    return res.json({
        message: "SignOut succesfull"
    })
}

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET
})