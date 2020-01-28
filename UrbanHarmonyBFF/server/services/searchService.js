'use strict';

const config = require('../config/local.json');

const fetch = require('node-fetch');
const url = config.CMS_URL || process.env.CMS_URL;

const auth = require('../services/service-manager').get('auth-service');

class SearchService {
    
    /**
     * Function that handles searching using GraphQL
     *  it supports Strapi's filter specifications for mongo models
     * @author Omar I. Handouk
     * @since V1.0.0
     * @throws Search Service Error, when payload does not contain fields parameter
     * @param {object} payload JSON Object that contains: dir (required) DB model, filters(optional) strapi's filter specification, fields(required) fields to be returned
     * @param {callback} callback
     * @returns {callback} callback
     */
    advanceSearch(payload, callback) {
        auth.getAuthToken(function (token) {

            let dir = payload.dir;
            
            let filters = '(limit: 10000';

            // If there are filters && Object has keys
            if (payload.filters !== undefined && Object.keys(payload.filters).length !== 0){

                let filters_keys = Object.keys(payload.filters);
                let filters_string = '';

                for (let i = 0; i < filters_keys.length; ++i){
                    let key = filters_keys[i];

                    filters_string += `${key}: \"${payload.filters[key]}\"`;

                    if (i !== filters_keys.length - 1){
                        filters_string += ',';
                    }
                }

                filters += ', where: {' + filters_string + '}';
            }
			
			filters += ')';

            let fields = '';

            if (payload.fields === undefined || payload.fields.length === 0){
                throw new Error('Search Service: Payload does not contain fields');
            }

            for (let i = 0; i < payload.fields.length; ++i){
                fields += payload.fields[i];
    
                if (i !== fields.length - 1){
                    fields += ' ';
                }
            }

            let body = {
                "query": `{${dir}${filters}{${fields}}}`
            };

            let path = `${url}graphql`;
            let options = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            fetch(path, options)
                .then(res => res.json())
                .then(body => callback(body))
                .catch(err => err);
        });
    }
}

module.exports = function (app, serviceManager) {
    let searchService = new SearchService();
    serviceManager.set("search-service", searchService);
};