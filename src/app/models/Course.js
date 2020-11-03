const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Course = new Schema({
    title: {type: String, maxlength: 255},
    desciption: {type: String, maxlength: 5000},
    image: {type: String, maxlength: 255},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}
  }, { collection: 'courses' });

module.exports = mongoose.model('Course', Course);