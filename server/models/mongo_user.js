var db = require('../mongo_config');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  photo: String,
  userId: String,
  upvotedLists: [mongoose.Schema.Types.ObjectId],
  downvotedLists: [mongoose.Schema.Types.ObjectId],
  favLists: [mongoose.Schema.Types.ObjectId]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
