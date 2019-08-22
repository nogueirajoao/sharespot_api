const Post = require('../models/Post');
const Validator = require('./validations/postValidations');

module.exports = {
    
    async index(req, res) {
        const user = req.user.id;
        const posts = await Post.find({});
        res.json(posts);
    },
    
    async create(req, res) {
        const { errors, isValid } = Validator.validatePostInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }
        try {
            const newPost = new Post({ 
                user: req.user.id, 
                content: req.body.content
            });
    
            res.json(await newPost.save());
        } catch(err) {
            console.log(err);
        }
    },
    
    async edit(req, res) {

        const { errors, isValid } = Validator.validatePostInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        try {
            const postId = req.params.id;
            const content = req.body.content;
            const user = req.user;
    
            const post = await Post.findById(postId);
            if(!userOwnsPost(post.user, user.id)){
                return res.status(401).json(createErrorMsg('User not authorized'));
            }
            
            post.content = content;
            res.json(await post.save());
        } catch (err) {
            res.status(404).json(createErrorMsg('No post found'));
        }

    },

    async delete(req, res) {
        try {
            const postId = req.params.id;
            const loggedUser = req.user;
    
            const post = await Post.findById(postId);

            if (!userOwnsPost(post.user.id, loggedUser.id)) {
                return res.status(401).json(createErrorMsg('User not authorized'));
            }

            await post.remove(); 
            
            res.status(204).send();
    
        } catch(err) {
            res.status(404).json(createErrorMsg('No post found'));
        }
    },     

    async insertLike(req, res) {
        const postId = req.params.id;
        const user = req.user.id;
        try {
            const post = await Post.findById(postId);

            const like = post.likes.find(like => like.user == user);
            if (!like) {
                post.likes.push({ user });
                return res.send(await post.save());
            }
            const likes = post.likes.filter(i => i.user != user);
            post.likes = likes;
            res.send(await post.save());
        } catch(err) {
            console.log(err);
        }
    
    },

    async insertComment(req, res) {
        const postId = req.params.id;
        const user = req.user.id;
        const { content } = req.body;

        try {
            const post = await Post.findById(postId);
            post.comments.push({ user, content });
            res.send(await post.save());
        } catch(err) {
            res.status(404).json(createErrorMsg('No post found'));
        }
    }  
};

userOwnsPost = (postUserId, userId) => {
    return postUserId == userId;
}

createErrorMsg = (msg) => {
    return { error : msg };
};