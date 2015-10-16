module.exports = (router) => {
  return function* (next) {
    yield next;
    router.get('/', function* () {
      yield this.render('index', {title: 'hello world!'});
    });
  };
};
