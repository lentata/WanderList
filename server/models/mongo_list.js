var db = require('./mongo_config');
var mongoose = require('mongoose');

/*** LIST SCHEMA ***/
var listSchema = new mongoose.Schema({
  createdAt: String,
  title: String,
  author: String,
  upvote: Number,
  downvote: Number,
  categories: [String],
  content: [contentSchema],
  comments: [commentSchema]
});

var List = mongoose.model('List', listSchema);

module.exports = List;

/*** CONTENT SCHEMA ***/
var contentSchema = new mongoose.Schema({
  headline: String,
  imageUrl: String,
  description: String
});

var Content = mongoose.model('Content', contentSchema);

model.exports = Content;

/*** COMMENT SCHEMA ***/
var commentSchema = new mongoose.Schema({
  user: String,
  text: String
});

var Comment = mongoose.model('Comment', commentSchema);

model.exports = Comment;
