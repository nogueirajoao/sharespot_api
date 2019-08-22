const passport = require('passport');

const UserController = require('../controllers/userController');

module.exports = (app) => {
    app.post('/api/user/register', UserController.register);
    
    app.post('/api/user/login', UserController.login);

    app.get('/api/user/current', passport.authenticate('jwt', { session: false }), UserController.current);
};