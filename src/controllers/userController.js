const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');
const Validator = require('./validations/userValidations');
const key = require('../../config/dev_keys').secret;

module.exports = {
    async register(req, res) {
        const { errors, isValid } = Validator.validateRegisterInput(req.body);

        if (!isValid) {
          return res.status(400).json(errors);
        }
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                errors.email = 'Email already exists';
                return res.status(409).json(errors);
            }

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            //Encrypting password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    res.json(await newUser.save());
                });
            });
        } catch(err) {
            console.log(err);
        }
    },

    login(req, res) {
        const { errors, isValid } = Validator.validateLoginInput(req.body);

        // Check Validation
        if (!isValid) {
        return res.status(400).json(errors);
        }

        const email = req.body.email;
        const password = req.body.password;

        // Find user by email
        User.findOne({ email }).then(user => {
            // Check for user
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            // Check Password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                // User Matched
                const payload = { id: user.id, name: user.name };

                jwt.sign(
                    payload,
                    key,
                    { expiresIn: 360000 },
                    (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                    }
                );
                } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
                }
            });
        });
    },

    current(req, res) {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
          });
    }
}