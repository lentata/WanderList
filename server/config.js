var path = require('path');
var db = require('knex')({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'testdb',
    charset: 'utf8',
    filename: path.join(__dirname, '../db/testdb.sqlite')
  }
});

db.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 255);
      user.string('password', 255);
    }).then(function (table) {
      console.log('Created users table');
    });
  }
});

var Bookshelf = require('bookshelf')(db);
module.exports = Bookshelf;