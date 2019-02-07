const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
const url = localConfig.CMS_URL || process.env.CMS_URL;
const wf_url = localConfig.NODE_RED_URL || process.env.NODE_RED_URL;
class CompetitionService {
    getCompetitionOfTheMonth(callback) {
        fetch(url + 'competitions?_sort=deadline:desc&_limit=1')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"title":Title,"description":Description, "rules": Rules, "judges" : Judges, "deadline" : Deadline}');
                let competitionOfTheMonth = expression.evaluate(myJson);
                callback(competitionOfTheMonth);
            });
    }

    getAllCompetition(callback) {
        fetch(url + 'competitions')
            .then(res => res.json())
            .then(function (json) {
                let expression = jsonata('$.{"id":_id,"title":Title,"description":Description, "rules": Rules, "judges" : Judges, "deadline" : deadline, "image" :  "' + url.slice(0, -1) + '"& photo.url}');
                let competitions = expression.evaluate(json);
                callback(competitions);
            });
    }

    getCompetitionByID(ID, callback) {
        fetch(url + 'competitions?_id=' + ID)
            .then(res => res.json())
            .then(function (json) {
                let expression = jsonata('$.{"id":_id,"title":Title,"description":Description, "rules": Rules, "judges" : Judges, "deadline" : deadline, "image" :  "' + url.slice(0, -1) + '"& photo.url}');
                let competitionID = expression.evaluate(json);
                callback(competitionID);
            });
    }

    getCompetitionWinners(callback) {
        fetch(url + 'contestant?status=winner')
            .then(res => res.json())
            .then(function (json) {
                let expression = jsonata('$.{"id":_id,"name":name,"competitionName":competition.Title, "description": competition.Description,"image":personalPhoto, "compID":competition._id}');
                let winners = expression.evaluate(json);
                callback(winners);
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