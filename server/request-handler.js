var db = require('./mongo_config');
var List = require('./models/mongo_list');
var User = require('./models/mongo_user');
var mongoose = require('mongoose');

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

  app.get('/api/user', function(req, res) {
    User.findOne({'_id': '57acacb4b086aca01bc783ea'}, function(err, user) {
      if(err) throw err;
      res.send(user);
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
      res.status(status).json(post);
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

  app.post('/api/comments/:id', function(req, res) {
    console.log("ID?!", req.params);
    console.log("req body:", req.body);
    
    List.update
  });

  //post a vote for a list
  app.post('/api/votes', function(req, res){
    //params 
    //@req.body.lid string
    //@req.body.votes boolean
    //@req.body.uid string
    var lid = req.body.lid;
    var vflag = req.body.votes;
    var uid = req.body.uid;

    var mapUpLists = {};
    var mapDownLists = {};
    User.findOne({'_id': uid}, function(err, info) {
      if(err) throw err;
      var upflag = info.upvotedLists.map(function(objId) {
        return objId.toString();
      }).includes(lid) || false;
      var downflag = info.downvotedLists.map(function(objId) {
        return objId.toString();
      }).includes(lid) || false;
      var addUpFlag = false;
      var addDownFlag = false;
      var delUpFlag = false;
      var delDownFlag = false;
      List.findOne({'_id': lid}, function(err, list) {
        if(err) throw err;
        if(vflag) {
          if(!upflag && !downflag) {
            list.upvote = +list.upvote + 1;
            resObj = {
              up: 1,
              down: 0
            };
            addUpFlag = true;
          }
          else if(!upflag && downflag) {
            list.upvote = +list.upvote + 1;
            list.downvote = +list.downvote - 1;
            resObj = {
              up: 1,
              down: -1
            };
            addUpFlag = true;
            delDownFlag = true;
          }
          else if(upflag && !downflag) {
            list.upvote = +list.upvote - 1;
            resObj = {
              up: -1,
              down: 0
            };
            delUpFlag = true;
          }
        } else {
          if(!upflag && !downflag) {
            list.downvote = +list.downvote + 1;
            resObj = {
              up: 0,
              down: 1
            };
            addDownFlag = true;
          }
          else if(upflag && !downflag) {
            list.downvote = +list.downvote + 1;
            list.upvote = +list.upvote - 1;
            resObj = {
              up: -1,
              down: 1
            };
            addDownFlag = true;
            delUpFlag = true;
          }
          else if(!upflag && downflag) {
            list.downvote = +list.downvote - 1;
            resObj = {
              up: 0,
              down: -1
            };
            delDownFlag = true;
          }
        }
        list.save(function(err) {
          if(err) throw err;
          if(addUpFlag) {
            info.upvotedLists.push(lid);
            info.save(function(err) {
              if(err) throw err;
            });
          }
          if(addDownFlag) {
            info.downvotedLists.push(lid);
            info.save(function(err) {
              if(err) throw err;
            });
          }
          if(delUpFlag) {
            User.update({'_id': uid}, { $pullAll: {'upvotedLists': [lid]}}, function(err) {
              if(err) throw err;
            });
          }
          if(delDownFlag) {
            User.update({'_id': uid}, { $pullAll: {'downvotedLists': [lid]}}, function(err) {
              if(err) throw err;
            });
          }
        });
        res.send(resObj);
      });
    });
  });

  app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}
