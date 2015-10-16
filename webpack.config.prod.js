var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: [
    './src/javascripts/app.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist/javascripts'),
    publicPath: '/javascripts',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: 'node_modules',
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css!cssnext'
      }
    ]
  },
  resolve: {
    extensions: ['', '.jsx', '.js']
  }
};
