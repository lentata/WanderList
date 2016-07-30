var express = require('express');
var path = require('path');

const app = express();

(function() {
  var webpack = require('webpack');
  var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
  var compiler = webpack(webpackConfig);

  app.use(require("webpack-dev-middleware")(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/assets',
    stats: {
      colors: true,
    }
  }));

  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
})();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function() {
  console.log('server up at port 3000!!!! OMGEEEEEZ!!!');
});
