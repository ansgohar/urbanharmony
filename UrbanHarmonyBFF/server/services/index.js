// The content of this file was generated by IBM Cloud
// No not modify it as it might get overridden

var IBMCloudEnv = require('ibm-cloud-env');
var serviceManager = require('./service-manager');
IBMCloudEnv.init();

module.exports = function (app) {
    require('./authenticationService')(app, serviceManager);
    require('./articleService')(app, serviceManager);
    require('./projectService')(app, serviceManager);
    require('./internalService')(app, serviceManager);
    require('./competitionService')(app, serviceManager);
    require('./complainService')(app, serviceManager);
    require('./lawService')(app, serviceManager);
    require('./globalSearchService')(app, serviceManager);
    require('./bookService')(app, serviceManager);
    require('./officesService')(app, serviceManager);
    require('./incidentService')(app, serviceManager);
    require('./videoService')(app, serviceManager);
    require('./searchService')(app, serviceManager);
    require('./conferencesService')(app, serviceManager);
    require('./petitionService')(app, serviceManager);
    require('./contestantService')(app, serviceManager);
    require('./studiesService')(app, serviceManager);
    require('./spotlightService')(app, serviceManager);
};