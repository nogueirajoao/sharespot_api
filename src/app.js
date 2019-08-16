const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

const app = express();

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/sharespot', { useNewUrlParser: true });
}

app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message })
})

module.exports = app;