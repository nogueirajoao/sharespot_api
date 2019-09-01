const passport = require('passport');

const PostController = require('../controllers/postController');

module.exports = (app) => {
    app.get('/api/posts', PostController.index);

    app.post('/api/posts', passport.authenticate('jwt', { session: false }), PostController.create);

    app.put('/api/posts/:id', passport.authenticate('jwt', { session: false }), PostController.edit);

    app.patch('/api/posts/:id/comments', passport.authenticate('jwt', { session: false }), PostController.insertComment);

    app.patch('/api/posts/:id/likes', passport.authenticate('jwt', { session: false }), PostController.insertLike);
    
    app.delete('/api/posts/:id', passport.authenticate('jwt', { session: false }), PostController.delete);
}