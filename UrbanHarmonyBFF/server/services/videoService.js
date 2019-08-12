const localConfig = require('../config/local.json')
const fetch = require("node-fetch");
const jsonata = require("jsonata");
const url = localConfig.CMS_URL || process.env.CMS_URL;

class VideosService {

    getAuthToken(callback){
        const user = localConfig.USER || process.env.USER;
        const secert = localConfig.SECERT || process.env.SECERT;
        
        let authPath = url + 'auth/local/';
        let config = {
            method: 'POST',
            body: JSON.stringify({
                "identifier": `${user}`,
                "password": `${secert}`
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(authPath, config)
        .then(function(res){
            return res.json();
        })
        .then(function(json){
            callback(json.jwt);
        })
    }

    getAllVideos(callback) {
        this.getAuthToken(function(token){
            fetch(url + 'videos', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let expression = jsonata('$.{"id":_id,"channel":Channel,"title":ProgramName,"guests":GuestNames,"date":date,"description":Description,"url":URL,"moreDetails":MoreDetails}');
                console.log(expression)
                let videosObject = expression.evaluate(myJson);
                
                callback(videosObject);
            });
        })
        
    }
}

module.exports = function (app, serviceManager) {
    var videoservice = new VideosService();
    serviceManager.set("videos-services", videoservice);
};