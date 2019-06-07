var mongoose = require('mongoose');
var {ObjectId} = mongoose.Schema;

var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        minLengh: 3,
        maxlength: 60
    },
    body: {
        type: String,
        required: "content is required",
        minLengh: 3,
        maxlength: 500
    },
    postedBy: {
       type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Post", postSchema)