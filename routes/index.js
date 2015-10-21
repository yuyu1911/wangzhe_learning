'use strict';
module.exports.index = function* (next) {
  yield this.render('index', {title: 'hello world!'});
};

module.exports.chart = function* (next) {
  yield this.render('chart', {title: '图表'});
}
