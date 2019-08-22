const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const passport = require('passport');

const db = require('../config/dev_keys').mongoURI;

const app = express();

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => { console.info('MongoDB Connected')})
        .catch(err => console.warn('Warning', err));
}

app.use(passport.initialize());

require('../config/passport')(passport);

app.use(express.json({ extended: false }));

routes(app);

module.exports = app;