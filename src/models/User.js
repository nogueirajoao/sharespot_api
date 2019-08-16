const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: String,
    name: String,
    lastname: String,
    city: String,
    country: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;