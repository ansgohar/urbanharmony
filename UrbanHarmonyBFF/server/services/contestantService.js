'use strict';

const config = require('../config/local.json');
const fetch  = require('node-fetch');
const auth   = require('../services/service-manager').get('auth-service');
const url    = config.CMS_URL || process.env.CMS_URL;

class ContestantService {
    
    constructor() {}

    registerContestant(contestantInfo, callback) {
        auth.getAuthToken( (token) => {
            let path = `${url}contestant`;
            let options = {
                method: 'POST',
                body: JSON.stringify(contestantInfo),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            fetch(path, options)
                .then(res => res.json())
                .then(body => callback(body))
                .catch(err => console.error(err));
        });
    }
}

module.exports = (app, serviceManager) => {
    let contestantService = new ContestantService();
    serviceManager.set('contestant-service', contestantService);
};