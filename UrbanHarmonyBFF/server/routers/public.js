var express = require('express');

module.exports = function (app) {
  var router = express.Router();
  router.use(express.static(process.cwd() + '/public'));

  app.use(router);
  app.use('/more', router);
  app.use('/competitionDetails', router);
  app.use('/detail', router);
  app.use('/moreProjects', router);
  app.use('/projectDetail', router);
  app.use('/complainsDetail', router);
  app.use('/lawsDetails', router);
  app.use('/vision', router);
  app.use('/library', router);
  app.use('/search', router);
  app.use('/competitionInfo',router);
}
