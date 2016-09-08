var db = require('./mongo_config');
var List = require('./models/mongo_list');
var User = require('./models/mongo_user');
var mongoose = require('mongoose');

var path = require('path');
var jsonfile = require('jsonfile');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

module.exports = function(app) {
  //go to homepage
  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });

  //get all lists, ADAPTED FOR MONGO
  app.get('/api/lists', function(req, res) {
    List.find({}, function(err, docs) {
      if (err) throw err;
      res.send(docs);
    });
  });

  //Get Quantity of lists
  app.get('/api/list', function(req, res) {
    List.count({}, function(err, num) {
      if (err) throw err;
      res.status(201).json(num);
    });
  });

  //get all upvotes
  app.post('/api/lists/upvote', function(req, res) {
    var ids = [];
    List.find({}, function(err, docs) {
      docs.forEach(function(item){
        if (req.body.indexOf("" + item._id) !== -1){
          ids.push(item);
        }
      })
      res.status(201).json(ids);
    });
  });

  app.get('/api/lists/votelist', function(req, res) {
    List.find({ '_id': { $in: JSON.parse(req.query.ids) } }, function(err, lists) {
      if (err) throw err;
      res.send(lists);
    })
  });

  app.get('/api/lists/others', function(req, res) {
    var resObj = {};
    List.find({'authorId': req.query.id}, function(err, lists) {
      if (err) throw err;
      resObj.lists = lists.map(list => list._id.toString());
      User.findOne({'userId': req.query.id}, function(err, user) {
        if (err) throw err;
        resObj.info = user;
        res.send(resObj);
      });
    });
  });

//List1 is Temporary for Pagination, Testing purposes only
   app.post('/api/listspag', function(req, res) {
    var p = (req.body.type - 1) * 10;
    if (req.body.filter === 'top'){
      List
      .find({})
      .exec(function (err, posts) {
        posts = posts.sort(function(a, b){
          return (b.upvote - b.downvote) - (a.upvote - a.downvote);
        });
        res.send(posts.slice(p, p + 9));
      });
    } else

    if (req.body.filter === 'new'){
        List
      .find({})
      .sort({createdAt: 'desc'})
      .limit(10)
      .skip(p)
      .exec(function (err, posts) {
        res.send(posts);
      });
    } else

    if (req.body.filter === 'contro'){
      List
      .find({})
      .limit(10)
      .skip(p)
      .exec(function (err, posts) {
        posts = posts.sort(function(a, b){
          return ((b.upvote+b.downvote) / Math.max(Math.abs(b.upvote-b.downvote), 1)) -
          ((a.upvote+a.downvote) / Math.max(Math.abs(a.upvote-a.downvote), 1))
        })
        res.send(posts);
      });
    }
  });

  app.get('/api/user/:uid', function(req, res) {
    var uid = req.params.uid;
    var resObj = {};
    User.findOne({'userId': uid}, function(err, user) {
      if (err) throw err;
      resObj.user = user;
      List.find({'authorId': uid}, function(err, lists) {
        if (err) throw err;
        resObj.lists = lists;
        res.send(resObj);
      });
    });
  });

  app.get('/api/auth', function(req, res) {
    var info = req.query;
    User.where({
      username: info.username,
      password: info.password
    }).fetch().then(function(user) {
      if (user) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
  });

  app.post('/api/auth', function(req, res) {
    var info = req.body;
    var userSetup = {
      username: req.body.displayName,
      email: req.body.email,
      userId: req.body.userId,
      photo: req.body.photo,
      upvotedLists: [],
      downvotedLists: [],
      favoriteLists: []
    }

    User.findOne({userId: req.body.userId}, function(err, user){
      if (err) throw err;
      if (!user){
        new User(userSetup).save(function(err){
          if (err) throw err;
        });
      }
      res.status(201).json(userSetup);

    })
  });
  //get individual list
  app.get('/api/lists/:id', function(req, res) {
    var id = req.params.id;
    List.find({ _id: id }, function(err, obj) {
      if (err) throw err;
      res.send(obj);
    });
  });

  //get random list
  app.get('/api/random', function(req, res) {
    List.count().exec(function(err, count){
      var random = Math.floor(Math.random() * count);

      List.findOne().skip(random).exec(
        function (err, result) {
          res.send(result);
      });
    });
  });

  // Get category
  app.get('/api/categoryPage/:categories', function(req, res) {
    var categories = req.params.categories;
    List.find({ categories: { "$in" : [categories] } }, function(err, obj) {
      if (err) throw err;
      res.send(obj);
    });
  });

  // Get lists that match searched term
  app.get('/api/search/:searchedTerm', function(req, res) {
    var searchedTerm = req.params.searchedTerm;
    List.find({ title: { '$regex': searchedTerm, '$options': "i" } }, function(err, obj) {
      if (err) throw err;
      res.send(obj);
    });
  });

  app.get('/api/searchCat/:searchedTerm', function(req, res) {
    var searchedTerm = req.params.searchedTerm;
    List.find({ categories: { '$regex': searchedTerm, '$options': "i" } }, function(err, obj) {
      if (err) throw err;
      res.send(obj);
    });
  });



  // Delete list
  app.delete('/api/lists/:id', function(req, res){
    List.findByIdAndRemove({_id: req.params.id}, function(err){
      if (err) throw err;
    });
  });

  //post a list
  app.post('/api/lists/', function(req, res){
    req.body.upvote = 0;
    req.body.downvote = 0;
    req.body.comments = [];
    req.body.createdAt = Date.now();

    var posted = req.body;

    new List(posted).save(function(err){
      if (err) throw err;
      res.status(201).json(posted);
    });
  });

  //post a comment
  app.post('/api/comments/', function(req, res){
    List.findById(req.body._id).exec()
    .then(function(doc) {
      doc.comments.push({
        "userId": req.body.userId,
        "user": req.body.user,
        "text": req.body.text,
        posted: Date.now()
      });

      return doc.save(); //returns a promise
    })
    .then(function(doc) {
      res.send(doc);
    })
    .catch(function(err) {
      throw err;
    });
  });

  //remove a comment
  app.post('/api/comments/:listId', function(req, res) {
    List.findById(req.params.listId).exec()
    .then(function(doc) {
      doc.comments.splice(req.body.commentIndex, 1);
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
    //params
    var lid = req.body.lid;
    var vflag = req.body.votes;
    var uid = req.body.uid;

    var mapUpLists = {};
    var mapDownLists = {};
    User.findOne({'userId': uid}, function(err, info) {
      if (err) throw err;
      var upflag = info.upvotedLists.map(function(objId) {
        return objId.toString();
      }).indexOf(lid) === -1 ? false : true;
      var downflag = info.downvotedLists.map(function(objId) {
        return objId.toString();
      }).indexOf(lid) === -1 ? false : true;
      var addUpFlag = false;
      var addDownFlag = false;
      var delUpFlag = false;
      var delDownFlag = false;
      List.findOne({'_id': lid}, function(err, list) {
        if (err) throw err;
        if (vflag) {
          if (!upflag && !downflag) {
            list.upvote = +list.upvote + 1;
            addUpFlag = true;
          }
          else if (!upflag && downflag) {
            list.upvote = +list.upvote + 1;
            list.downvote = +list.downvote - 1;
            addUpFlag = true;
            delDownFlag = true;
          }
          else if (upflag && !downflag) {
            list.upvote = +list.upvote - 1;
            delUpFlag = true;
          }
        } else {
          if (!upflag && !downflag) {
            list.downvote = +list.downvote + 1;
            addDownFlag = true;
          }
          else if (upflag && !downflag) {
            list.downvote = +list.downvote + 1;
            list.upvote = +list.upvote - 1;
            addDownFlag = true;
            delUpFlag = true;
          }
          else if (!upflag && downflag) {
            list.downvote = +list.downvote - 1;
            delDownFlag = true;
          }
        }
        list.save(function(err) {
          if (err) throw err;
          if (addUpFlag) {
            info.upvotedLists.push(lid);
            info.save(function(err) {
              if (err) throw err;
            });
          }
          if (addDownFlag) {
            info.downvotedLists.push(lid);
            info.save(function(err) {
              if (err) throw err;
            });
          }
          if (delUpFlag) {
            User.update({'userId': uid}, { $pullAll: { 'upvotedLists': [lid] } }, function(err) {
              if (err) throw err;
            });
          }
          if (delDownFlag) {
            User.update({'userId': uid}, { $pullAll: { 'downvotedLists': [lid] } }, function(err) {
              if (err) throw err;
            });
          }
        });
        res.sendStatus(201);
      });
    });
  });

  app.post('/api/favorite', function(req, res) {
    var lid = req.body.lid.toString();
    var uid = req.body.uid;
    var favorite = req.body.favorite;
    if (favorite) {
      User.update({'userId': uid}, { $pullAll: { 'favLists': [lid] } }, function(err) {
        if (err) throw err;
      });

    } else {
      User.findOne({'userId': uid}, function(err, user) {
        if (err) throw err;
        user.favLists.push(lid);
        user.save(function(err) {
          if (err) throw err;
        });
      });
    }
    res.sendStatus(201);
  });
  app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}
