'use strict';

const localConfig = require('../config/local.json');
const fetch = require('node-fetch');

const url = localConfig.CMS_URL || process.env.CMS_URL;

class authenticationService{

    /**
     * Function used to provide an authentication token
     * 
     * @param {function} callback           Callback function that takes a string as a parameter.
     * 
     * @return {function} Returns a callback function with an authentication string
     */
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
        };
        fetch(authPath, config)
        .then(function(res){
            return res.json();
        })
        .then(function(json){
            callback(json.jwt);
        });
    };
};

module.exports = function(app, serviceManager){
    let service = new authenticationService();

    serviceManager.set('auth-service', service);
};