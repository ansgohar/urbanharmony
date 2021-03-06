const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
const auth = require('../services/service-manager').get('auth-service');

const url = localConfig.CMS_URL || process.env.CMS_URL;
const wf_url = localConfig.NODE_RED_URL || process.env.NODE_RED_URL;
class CompetitionService {
    
    getCompetitionOfTheMonth(callback) {

        auth.getAuthToken(function(token){

            let payload = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();

            let firstDay = new Date(year, month, 1);
            let lastDay = new Date(year, month + 1, 0);

            let query = `_sort=-createdAt&_limit=2&deadline_gt=${firstDay.toISOString()}&deadline_lte=${lastDay.toISOString()}`;

            fetch(url + `competitions?${query}`, payload)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":Title,"description":Description, "rules": Rules, "judges" : Judges, "deadline" : deadline, "awards" : awards}');
                let competitionOfTheMonth = expression.evaluate(myJson);
                callback(competitionOfTheMonth);
            });

        });
    }

    getAllCompetition(callback) {

        auth.getAuthToken(function(token){

            let payload = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            fetch(url + 'competitions/?_limit=1000&_sort=-createdAt', payload)
            .then(res => res.json())
            .then(function (json) {
                let expression = jsonata('$.{"id":_id,"title":Title,"description":Description, "rules": Rules, "judges" : Judges, "deadline" : deadline, "image" :  "' + url.slice(0, -1) + '"& photo.url, "awards" : awards, "PDF": "' + url.slice(0, -1) + '" & extraInfo.url}');
                let competitions = expression.evaluate(json);
                
                
                callback(competitions);
            });
            
        });
    }

    getCompetitionByID(ID, callback) {

        auth.getAuthToken(function(token){

            let payload = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            fetch(url + 'competitions?_id=' + ID, payload)
            .then(res => res.json())
            .then(function (json) {
                let expression = jsonata('$.{"id":_id,"title":Title,"description":Description, "rules": Rules, "judges" : Judges, "deadline" : deadline, "image" :  "' + url.slice(0, -1) + '"& photo.url, "awards" : awards, "PDF": "' + url.slice(0, -1) + '" & extraInfo.url}');
                let competitionID = expression.evaluate(json);
                callback(competitionID);
            });
        });
    }

    getCompetitionWinners(callback) {

        auth.getAuthToken(function(token){

            let payload = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            fetch(url + 'contestant?status=winner', payload)
            .then(res => res.json())
            .then(function (json) {
                // let expression = jsonata('$.{"id":_id,"name":name,"competitionName":competition.Title, "description": competition.Description,"image":"' + url.slice(0, -1) + '"& personalPhoto.url, "compID":competition._id}');
                // let winners = expression.evaluate(json);
             
         
                for(let i=0 ; json.length > i ; i++){
                    if (json[i].personalPhoto !== null)
                        json[i].personalPhoto.url = url.slice(0,-1) + json[i].personalPhoto.url;
                }
                callback(json);
            });

        });
    }

    subscribeToTheCompetition(subscriptionData, callback) {
        fetch(wf_url + "subscribe", {
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(subscriptionData)
        })
            .then(res => res.json())
            .then(json => callback(json));
    }

    sendPics(subscriptionData, callback) {
        fetch(wf_url + "subscribe", {
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(subscriptionData)
        })
            .then(res => res.json())
            .then(json => callback(json));
    }
}

module.exports = function (app, serviceManager) {
    var competitionService = new CompetitionService();
    serviceManager.set("competition-services", competitionService);
};