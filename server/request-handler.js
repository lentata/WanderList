var dummy = require('./dummy');
var path = require('path');
var Users = require('./collections/users');
var User = require('./models/user');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });

  app.get('/api/lists', function(req, res) {
    res.send(dummy);
  });

  app.get('/api/auth', function(req, res) {
    // console.log(req.query)
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

  app.get('/lists/:id', function(req, res) {
    var id = req.params.id;
    for(var i = 0; i < dummy.lists.length; i++) {
      if(dummy.lists[i].id === id) {
        res.send(dummy.lists[i]);
      }
    }
    res.sendStatus(404);
  });
}
