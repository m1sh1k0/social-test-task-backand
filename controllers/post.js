var Post = require('../models/post');



exports.createPost = (req, res) => {
    var post = new Post(req.body);
    console.log(" NEW POST created: ", req.body);
    post.potedBy = req.profile
    post.save((err, resuls) => {
        if(err) {
            return err.status(400).json({
                error: err
            })
        }
        res.status(200).json({
            post: resuls
        })
    })
    
    
};

