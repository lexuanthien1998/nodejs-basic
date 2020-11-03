const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Post = new Schema({
    title: {type: String, maxlength: 255},
    description: {type: String, maxlength: 500},
    content: {type: String, maxlength: 5000},
    image: {type: String },
    category: {type: String},
    author:{type:String},
    slug: {type:String, slug: "title"},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
  }, { collection: 'posts' });

module.exports = mongoose.model('Post', Post);