var path = require('path');
var Users = require('./collections/users');
var User = require('./models/user');
var jsonfile = require('jsonfile');

module.exports = function(app) {
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
      obj.lists.push(req.body);
      jsonfile.writeFile(file, obj, function(err){
        if(err) throw err;
      });
    });
  });

  app.post('/api/lists', function(req, res) {
    var dest = __dirname + "/dummy.js";
    console.log("DUMMYDATA", dummy.lists);
    dummy = JSON.parse(dummy).lists.push(req.body);
    fs.writeFile(dest, "module.export = " + JSON.stringify(dummy), function(err) {
      if (err) {
        throw err;
      }
      res.sendStatus(201);
      res.end();
    });
  });
}
