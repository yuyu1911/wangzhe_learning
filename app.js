'use strict';
let koa = require('koa');
let serve = require('koa-static');
let render = require('koa-ejs');
let router = require('koa-router')();
let path = require('path');

let app = koa();

app.use(serve(path.join(__dirname, 'dist')));
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  cache: false,
  viewExt: 'html',
  debug: true
});

app.use(router.routes());
router.get('/', require('./routes/index').index);
router.get('/chart', require('./routes/index').chart);

app.listen(3000, (err) => {
  if (err) return console.log('someting error');
  console.log('Listening to 3000');
});
