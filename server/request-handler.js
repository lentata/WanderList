var db = require('./mongo_config');
var List = require('./models/mongo_list');
var User = require('./models/mongo_user');

var path = require('path');
// var Users = require('./collections/users');
// var User = require('./models/user');
var jsonfile = require('jsonfile');

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
    List.findOne({'_id': id}, function(err, obj) {
      console.log('individual ID:', obj);
      if(err) throw err;
      res.send(obj);
    })

    // var file = './public/dummy.JSON';
    // var id = req.params.id;
    // jsonfile.readFile(file, function(err, obj){
    //   if(err) throw err;
    //   for(var i = 0; i < obj.lists.length; i++) {
    //     if(obj.lists[i].id === id) {
    //       res.send(obj.lists[i]);
    //     }
    //   }
    // });
  });
  //post a list
  app.post('/api/lists/', function(req, res){
    var posted = req.body;
    List.create(posted, function(err, post){
      if (err) throw err;
      res.status(status).json(post);
    });
  });

  //post a comment
  app.post('/api/comments/', function(req, res){
    var file = './public/dummy.JSON';
    jsonfile.readFile(file, function(err, obj){
      if(err) throw err;

      var data = {
        user: req.body.user,
        text: req.body.text
      }

      obj.lists.forEach( list => {
        if(req.body.id === list.id) {
          list.comments.push(data)
        }
      })

      jsonfile.writeFile(file, obj, function(err){
        if(err) throw err;
        res.send(200);
      });
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
