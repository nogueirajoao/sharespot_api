const PostController = require('../controllers/postController');
const UserController = require('../controllers/userController');

module.exports = (app) => {

    app.get('/', (req, res) => { res.json({ welcom: 'there' })});

    app.post('/api/user', UserController.create);

    app.get('/api/posts', PostController.index);
    app.post('/api/posts', PostController.create);
    app.put('/api/posts/:id', PostController.edit);
    app.patch('/api/posts/:id/comments', PostController.insertComment);
    app.patch('/api/posts/:id/likes', PostController.insertLike);
    app.delete('/api/posts/:id', PostController.delete);

};