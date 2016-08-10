var db = require('./mongo_config');
var mongoose = require('mongoose'); //need to save in npm package

var listSchema = new mongoose.Schema({
  listID: Number,
  createdAt: String,
  title: String,
  author: userID reference,
  upvote: Number,
  downvote: Number,
  categories:  Array:Manual Reference:ObjectId,
  content: [
    {headline: String,
     img: String,
     desc: String
    }
  ],
  comments: [
    {
      user: '',
      upvote: 0,
      downvote: 0,
      text: ''
    }
  ]
});

var List = mongoose.model('List', listSchema);

module.exports = List;
