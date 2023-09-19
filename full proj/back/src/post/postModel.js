var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const postSchema = new mongoose.Schema({
    username: String,
    content: String,
    image: String,
  });

module.exports = mongoose.model('post', postSchema);