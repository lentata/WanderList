var mongoose = require('mongoose');

var mongodbUri = 'mongodb://lentata:lentata@ds017195.mlab.com:17195/lentata';

mongoose.connect(mongodbUri); //'mongodb://localhost/db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db started up, connection made');
});

module.exports = db;
