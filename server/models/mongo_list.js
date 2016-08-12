var db = require('../mongo_config');
var mongoose = require('mongoose');

/*** CONTENT SCHEMA ***/
var contentSchema = new mongoose.Schema({
  headline: String,
  image: String,
  description: String
});

/*** COMMENT SCHEMA ***/
var commentSchema = new mongoose.Schema({
  user: String,
  text: String,
  posted: Date
});

/*** LIST SCHEMA ***/
var listSchema = new mongoose.Schema({
  createdAt: Date,
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
