var mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLengh: 1,
        maxlength: 60
    },
    email: {
        type: String,
        trim: true,
        required: true,
        minLengh: 6,
        maxlength: 55
    },
    hashed_password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        maxlength: 500
    },

    salt: String, 
    created: {
        type: Date,
        default: Date.now
    },

    updated: Date
})

userSchema
    .virtual("password")
    .set(function(password) {
        // create temporary variable called _password
        this._password = password;
        // generate a timestamp
        this.salt = uuidv1();
        // encryptPassword()
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function(password) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
            console.log(hash);
        } catch(err) {
            return ""
        }
    }
}

mongoose.model = function (user, userSchema) {
    return undefined;
}
module.exports = mongoose.model("User", userSchema)