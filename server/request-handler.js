var db = require('./mongo_config');
var List = require('./models/mongo_list');
var User = require('./models/mongo_user');

var path = require('path');
// var Users = require('./collections/users');
// var User = require('./models/user');
var jsonfile = require('jsonfile');

// var Q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

module.exports = function(app) {
  var id = 7; //get rid of this???

  //go to homepage
  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });

  //get all lists, ADAPTED FOR MONGO
  app.get('/api/lists', function(req, res) {
    List.find({}, function(err, docs) {
      if(err) throw err;
      res.send(docs);
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
  //get individual list
  app.get('/api/lists/:id', function(req, res) {
    var id = req.params.id;

    List.findOne({_id: id}, function(err, obj) {
      if(err) throw err;
      res.send(obj);
    });
  });




  // Delete list
  app.delete('/api/lists/:id', function(req, res){
    console.log("REKKKKKKK", req.params.id);
    List.findByIdAndRemove({_id: req.params.id}, function(err){
      if(err) throw err;
    });

  });





  //post a list
  app.post('/api/lists/', function(req, res){
    req.body.upvote = 0;
    req.body.downvote = 0;
    req.body.comments = [];
    console.log('req.body', req.body);
    var posted = req.body;
    console.log("POSTED", posted);

    new List(posted).save(function(err){
      if (err) throw err;
    });
  });

  //post a comment
  app.post('/api/comments/', function(req, res){
    List.findById(req.body._id).exec()
    .then(function(doc) {
      doc.comments.push({"user": req.body.user, "text": req.body.text});

      return doc.save(); //returns a promise
    })
    .then(function(doc) {
      res.send(doc);
    })
    .catch(function(err) {
      throw err;
    });
  });

  //post a vote for a list
  app.post('/api/votes', function(req, res){
    var file = './public/dummy.JSON';
    var resObj = {};
    jsonfile.readFile(file, function(err, obj){
      var selectedList = obj.lists.filter(function(list) {
        return list.id === req.body.id;
      })[0];
      if(err) throw err;
      if(req.body.votes) {
        if(!selectedList.upflag && !selectedList.downflag) {
          selectedList.upvote = +selectedList.upvote + 1;
          selectedList.upflag = true;
          resObj = {
            up: 1,
            down: 0,
            upflag: true,
            downflag: false
          };
        }
        else if(!selectedList.upflag && selectedList.downflag) {
          selectedList.upvote = +selectedList.upvote + 1;
          selectedList.downvote = +selectedList.downvote - 1;
          selectedList.upflag = true;
          selectedList.downflag = false;
          resObj = {
            up: 1,
            down: -1,
            upflag: true,
            downflag: false
          };
        }
        else if(selectedList.upflag && !selectedList.downflag) {
          selectedList.upvote = +selectedList.upvote - 1;
          selectedList.upflag = false;
          resObj = {
            up: -1,
            down: 0,
            upflag: false,
            downflag: false
          };
        }
      } else {
        if(!selectedList.upflag && !selectedList.downflag) {
          selectedList.downvote = +selectedList.downvote + 1;
          selectedList.downflag = true;
          resObj = {
            up: 0,
            down: 1,
            upflag: false,
            downflag: true
          };
        }
        else if(selectedList.upflag && !selectedList.downflag) {
          selectedList.downvote = +selectedList.downvote + 1;
          selectedList.upvote = +selectedList.upvote - 1;
          selectedList.upflag = false;
          selectedList.downflag = true;
          resObj = {
            up: -1,
            down: 1,
            upflag: false,
            downflag: true
          };
        }
        else if(!selectedList.upflag && selectedList.downflag) {
          selectedList.downvote = +selectedList.downvote - 1;
          selectedList.downflag = false;
          resObj = {
            up: 0,
            down: -1,
            upflag: false,
            downflag: false
          };
        }
      }
      jsonfile.writeFile(file, obj, function(err) {
        if(err) throw err;
        res.send(resObj);
      });
    });
  });

  app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}
