var path = require('path');
var Users = require('./collections/users');
var User = require('./models/user');
var jsonfile = require('jsonfile');

module.exports = function(app) {
  var id = 7;

  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });

  app.get('/api/lists', function(req, res) {
    var file = './public/dummy.JSON';
    jsonfile.readFile(file, function(err, obj){
      if(err) throw err;
      res.send(obj);
    });
  });

  app.get('/api/auth', function(req, res) {
    var info = req.query;
    User.where({
      username: info.username,
      password: info.password
    }).fetch().then(function(user) {
      if(user) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });

  app.post('/api/auth', function(req, res) {
    var info = req.body;
    new User({username: info.username, password: info.password}).save().then(function() {
      res.sendStatus(201);
    });
  });

  app.get('/api/lists/:id', function(req, res) {
    var file = './public/dummy.JSON';
    var id = req.params.id;
    jsonfile.readFile(file, function(err, obj){
      if(err) throw err;
      for(var i = 0; i < obj.lists.length; i++) {
        if(obj.lists[i].id === id) {
          res.send(obj.lists[i]);
        }
      }
    });
  });

  app.post('/api/lists/', function(req, res){
    var file = './public/dummy.JSON';
    jsonfile.readFile(file, function(err, obj){
      if(err) throw err;
      req.body.id = id++;
      obj.lists.push(req.body);
      jsonfile.writeFile(file, obj, function(err){
        if(err) throw err;
      });
    });
  });

  app.get('/api/votes', function(req, res){
    var file = './public/dummy.JSON';
    jsonfile.readFile(file, function(err, obj){
      var selectedList = obj.lists[req.query.index];
      if(err) throw err;
      if(req.query.votes === "true") {
        if(!selectedList.upflag && !selectedList.downflag) {
          selectedList.upvote = +selectedList.upvote + 1;
          selectedList.upflag = true;
          resObj = {up: 1, down: 0};
        }
        else if(!selectedList.upflag && selectedList.downflag) {
          selectedList.upvote = +selectedList.upvote + 1;
          selectedList.downvote = +selectedList.downvote - 1;
          selectedList.upflag = true;
          selectedList.downflag = false;
          resObj = {up: 1, down: -1};
        } else {
          resObj = {up: 0, down: 0};
        }
      } else {
        if(!selectedList.upflag && !selectedList.downflag) {
          selectedList.downvote = +selectedList.downvote + 1;
          selectedList.downflag = true;
          resObj = {up: 0, down: 1};
        }
        else if(selectedList.upflag && !selectedList.downflag) {
          selectedList.downvote = +selectedList.downvote + 1;
          selectedList.upvote = +selectedList.upvote - 1;
          selectedList.upflag = false;
          selectedList.downflag = true;
          resObj = {up: -1, down: 1};
        } else {
          resObj = {up: 0, down: 0};
        }
      }
      jsonfile.writeFile(file, obj, function(err) {
        if(err) throw err;
        res.send(resObj);
      });
    });
  });
}
