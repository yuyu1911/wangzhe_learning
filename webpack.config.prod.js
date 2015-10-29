var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: {
    index: ['./src/javascripts/app.jsx'],
    chart: ['./src/javascripts/chart.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist/javascripts'),
    publicPath: '/javascripts',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: 'node_modules',
        loader: 'babel-loader?optional[]=es7.classProperties'
      },
      {
        test: /\.css$/,
        loader: 'style!css!cssnext'
      }
    ]
  },
  resolve: {
    alias: {
      'highcharts': 'highcharts-release/highcharts.src.js',
      'highcharts-adapters': 'highcharts-release/adapters/standalone-framework.src.js',
      'codemirror-theme-ambiance': 'codemirror/theme/ambiance.css',
      'codemirror-theme-base': 'codemirror/lib/codemirror.css'
    },
    modulesDirectories: ['node_modules'],
    extensions: ['', '.jsx', '.js']
  }
};
