var db = require('./mongo_config');
var List = require('./models/mongo_list');
var User = require('./models/mongo_user');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.redirect('index.html');
  });

  app.get('/api/lists', function(req, res) {
    //conduct query for all lists here
    // List.find({})
  })

}
