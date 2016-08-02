var dummy = require('./dummy');
var path = require('path');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });

  app.get('/api/posts', function(req, res) {
    res.send(dummy);
  });
}