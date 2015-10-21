var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: {
    index: [
            'webpack-dev-server/client?http://127.0.0.1:8080',
            'webpack/hot/only-dev-server',
            './src/javascripts/app.jsx'
          ],
    chart: [
          'webpack-dev-server/client?http://127.0.0.1:8080',
          'webpack/hot/only-dev-server',
          './src/javascripts/chart.jsx'
    ]
  },

  output: {
    path: path.join(__dirname, 'dist/javascripts'),
    publicPath: '/javascripts',
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: 'node_modules',
        loader: 'react-hot!babel-loader?optional[]=es7.classProperties'
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
