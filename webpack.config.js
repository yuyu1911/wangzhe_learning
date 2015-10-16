var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/javascripts/app.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist/javascripts'),
    publicPath: '/javascripts',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: 'node_modules',
        loader: 'react-hot!babel'
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
