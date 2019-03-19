const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
const url = localConfig.CMS_URL || process.env.CMS_URL;

class IncidentsService {

    getAllIncidents(callback) {
        fetch(url + 'incident')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":subject,"date":Date,"image":imageURL}');
                let incidentsObject = expression.evaluate(myJson);
                callback(incidentsObject);
            });
    }

    getIncidentByID(id, callback) {
        fetch(url + 'incident/' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":subject,"date":Date,"image":imageURL,"description":description,"address":address,"photographer":Photographer}');
                let incidentsObject = expression.evaluate(myJson);
                callback(incidentsObject);
            });
    }
}

module.exports = function (app, serviceManager) {
    var incidentservice = new IncidentsService();
    serviceManager.set("incidents-services", incidentservice);
};