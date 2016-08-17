var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var env = process.env.WEBPACK_ENV;


var config = {
  devtool: 'source-map',
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    publicPath: __dirname + 'assets'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: []
}



if (env === 'dev') {
  config.entry.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  new WebpackDevServer(webpack(config), {
    contentBase: './public',
    hot: true
  }).listen(8080);
}

module.exports = config;
