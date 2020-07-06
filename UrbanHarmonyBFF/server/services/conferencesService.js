const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
const url = localConfig.CMS_URL || process.env.CMS_URL;
const auth = require('../services/service-manager').get('auth-service');


class ConferencesService {


    getAllConferences(callback) {
        auth.getAuthToken(function(token){
            fetch(url + 'conferences', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                callback(myJson);
            });
        })
        
    }
}


module.exports = function (app, serviceManager) {
    var conferencesservice = new ConferencesService();
    serviceManager.set("conferences-services", conferencesservice);
};