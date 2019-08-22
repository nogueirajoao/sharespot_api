const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true},
    name: { type: String, required: true },
    lastname: { type: String },
    city: { type: String },
    country: { type: String }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;