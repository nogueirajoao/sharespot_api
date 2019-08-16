const User = require('../models/User');

module.exports = {
    create(req, res) {
        const userProps = req.body;

        User.create(userProps)
            .then(user => res.send(user));

    },

    edit(req, res) {

    },

    delete(req, res) {

    }

}