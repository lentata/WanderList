var path = require('path');
var webpack = require('webpack');

module.exports = {
  externals: {
  'cheerio': 'window',
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
  },
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'client')
      }
    ]
  }

};
