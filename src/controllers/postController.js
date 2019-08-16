const Post = require('../models/Post');
const _ = require('lodash');

module.exports = {

    index(req, res, next) {
        const user = req.headers.user;
        Post.find({ user })
            .then( posts => res.send(posts))
            .catch(next);
    },

    insertLike(req, res, next) {
        const postId = req.params.id;
        const { user } = req.headers;

        Post.findById(postId)
            .then(post => {
                const like = post.likes.find(like => like.user == user);
                if (!like) {
                    post.likes.push({ user });
                    return post.save();
                }
                const likes = post.likes.filter(i => i.user != user);
                post.likes = likes;
                return post.save();
            })
            .then(post => res.send(post))
            .catch(next);
    },

    insertComment(req, res, next) {
        const postId = req.params.id;
        const { user } = req.headers;
        const { content } = req.body;

        Post.findById(postId)
            .then(post => {
                post.comments.push({ user, content });
                return post.save();
            })
            .then(post => res.send(post))
            .catch(next);
    },

    create(req, res, next) {
        const postProps = req.body;

        Post.create(postProps)
            .then(post => res.json(post))
            .catch(next);
    },    

    edit(req, res, next) {
        const postId = req.params.id;
        const postProps = req.body;

        Post.findByIdAndUpdate(postId, postProps)
            .then(() => Post.findById(postId))
            .then(post => res.send(post))
            .catch(next);
    },

    delete(req, res, next) {
         const postId = req.params.id;

         Post.findByIdAndDelete(postId)
            .then(() => res.status(204).send())
            .catch(next);
    }   
};