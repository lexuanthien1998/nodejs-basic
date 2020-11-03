const Post = require('../models/Post');

class PostController {
    index(req, res, next) {
        Post.find({})
            .then(post => {
                post = post.map(post => post.toObject())
                res.render('post/index', {post});
            })
            .catch(next);
        console.log(JSON.stringify(req.cookies));
    }

    show(req, res, next) {
        Post.findOne({slug: req.params.slug})    
            .then(post => res.render('post/show', {post: post.toObject()}))
            .catch(next);
    }
}

module.exports = new PostController;