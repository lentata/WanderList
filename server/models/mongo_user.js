var db = require('./mongo_config');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  userID: String,
  username: String,
  password: String,
  email: String
  upvotedLists: [listSchema],
  downvotedLists: [listSchema]
});

var User = mongoose.model('User', listSchema);

module.exports = User;
