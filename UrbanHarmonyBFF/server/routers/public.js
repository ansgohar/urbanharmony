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
  app.use('/contact-us', router);
  app.use('/related-links', router);
  app.use('/library', router);
  app.use('/search', router);
  app.use('/competitionInfo', router);
  app.use('/consultingOffices', router);
  app.use('/consultingOfficeDetails', router);
  app.use('/allIncidents', router);
  app.use('/incidentDetails', router);
}
