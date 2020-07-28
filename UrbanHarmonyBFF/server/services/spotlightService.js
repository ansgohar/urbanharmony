'use strict';

const localConfig = require('../config/local.json')
const fetch = require('node-fetch');
const url = localConfig.CMS_URL || process.env.CMS_URL;
const auth = require('../services/service-manager').get('auth-service');

class SpotlightService {
    getSpotlight(limit, callback) {
        auth.getAuthToken((token) => {

            let limited = limit || 999999;
            let options = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            let path = `${url}spotlight?_limit=${limited}`;

            fetch(path, options)
                .then(response => response.json())
                .then(response => {
                    response.sort((a, b) => {
                        let x = new Date(a.createdAt);
                        let y = new Date(b.createdAt);

                        if (x > y) {
                            return -1;
                        } else if (x < y) {
                            return 1;
                        } else {
                            return 0
                        }
                    });

                    callback(response);
                })
        });
    }
}

module.exports = (app, serviceManager) => {
    serviceManager.set('spotlight-service', (new SpotlightService()));
}