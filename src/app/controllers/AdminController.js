const Post = require('../models/Post');
const axios = require('axios');
const bcrypt = require('bcrypt');

class AdminController {
    postList(req, res, next) {
        // axios.get("http://127.0.0.1:8000/api/user-member")
        // .then(function (response) {
        //     // res.json(response.data);
        //     res.render('admin/post', {data: response.data })
        // })
        // .catch(function (error) {
        //     res.send(error);
        // })

        Post.find({})
            .then(post => {
                post = post.map(post => post.toObject())
                res.render('admin/post', {post});
            })
            .catch(next);

    }

    postEdit(req, res, next) {
        Post.findById(req.params.id)
            .then(post => res.render('admin/edit_post', {post: post.toObject()}))
            .catch(next);
    }

    postUpdate(req, res, next) {
        Post.updateOne({_id: req.params.id}, {
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            image: req.file.filename,
            category: req.body.category,
            author: req.body.author,
        })
        .then(() => res.redirect('/admin'))
        .catch(next);
    }

    postDelete(req, res, next) {
        Post.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/admin'))
            .catch(next);
    }


    postCreate(req, res) {
        res.render('admin/create-post');
    }

    postStore(req, res) {
        // var d = new Date();
        // var date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
        // var createHash = function (password) {
        //     return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        // }

        // axios.post('http://127.0.0.1:8000/api/user-member', {
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: createHash(req.body.password),
        //     delete_flg: 1,
        // })
        // .then(function (response) {
        //     res.redirect('/admin');
        // })
        // .catch(function (error) {
        //     res.send('EMAIL ĐÃ TỒN TẠI');
        // });

        const post = new Post();
        post.title = req.body.title;
        post.description = req.body.description;
        post.content = req.body.content;
        post.category = req.body.category;
        post.author = req.body.author;
        post.image = req.file.filename;
        post.save();
    
        res.redirect('/admin');
    }
}

module.exports = new AdminController;