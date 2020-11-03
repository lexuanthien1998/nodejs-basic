const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    name: {type: String, maxlength: 255},
    email: {type: String, maxlength: 5000},
    password: {type: String, maxlength: 255},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
  }, { collection: 'users' });

module.exports = mongoose.model('User', User);