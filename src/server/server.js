var express = require('express');
var path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'server')));

app.listen(3000, function() {
  console.log('server up at port 3000!!!! OMGEEEEEZ!!!');
});
