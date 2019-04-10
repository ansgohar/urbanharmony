const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
const url = localConfig.CMS_URL || process.env.CMS_URL;
class ProjectService {

    getprojects(status, callback) {
        fetch(url + 'projects?_sort=updatedAt:desc&Status=' + status + "&_limit=3")
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"status":Status,"detail":Details,"event":Event,"place":Place, "id":_id,"title":Title,"image":"' + url.slice(0, -1) + '"& imgAfter.url}');
                let projectObject = expression.evaluate(myJson);
                callback(projectObject);
            });
    }


    getAllProjects(status, callback) {
        fetch(url + 'projects?_sort=updatedAt:desc&Status=' + status)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"status":Status,"detail":Details,"event":Event,"place":Place, "id":_id,"title":Title, "image" :  "' + url.slice(0, -1) + '"& imgAfter.url}');
                let projectObject = expression.evaluate(myJson);
                callback(projectObject);
            });
    }



    getProjectByID(id, callback) {
        fetch(url + 'projects/' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"status":Status,"detail":Details,"event":Event,"place":Place, "id":_id,"title":Title,"imageBefore":"' + url.slice(0, -1) + '"& imgBefore.url, "imageAfter":"' + url.slice(0, -1) + '"& imgAfter.url}');
                let projectObject = expression.evaluate(myJson);
                callback(projectObject);
            });
    }

}

module.exports = function (app, serviceManager) {
    var projects = new ProjectService();
    serviceManager.set("project-services", projects);
};