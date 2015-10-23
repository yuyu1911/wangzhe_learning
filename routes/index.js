'use strict';
let fs = require('co-fs');
let path = require('path');

module.exports.index = function* (next) {
  yield this.render('index', {title: 'hello world!'});
};

module.exports.chart = function* (next) {
  yield this.render('chart', {title: '图表'});
};

module.exports.data = function* (next) {
  this.type = 'json';
  this.body = yield fs.readFile(path.join(__dirname, '../data.json'), 'utf8');
}
