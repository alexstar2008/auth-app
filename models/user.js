const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User',new Schema({
    name:String,
    password:String,
    role:String
}));

module.exports = User;
