'use strict';

const fetch = require('node-fetch');
const config = require('../config/local.json');
const auth = require('../services/service-manager').get('auth-service');

const url = config.CMS_URL || process.env.CMS_URL;

class StudiesService {
	getStudies(callback) {
		auth.getAuthToken((token) => {
			const path = `${url}studies?_limit=100000`;
			const request = {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'User-Agent': 'NodeJS',
					'Authorization': `Bearer ${token}`
				}		
			};

			fetch(path, request)
				.then(response => response.json())
				.then(body => callback(body))
				.catch(err => console.error(err));
		});
	}

	filterStudies(query, callback) {
		auth.getAuthToken(token => {
			const path = `${url}graphql`;
			const request = {
				method: 'POST',
				body: JSON.stringify(query),
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'User-Agent': 'NodeJS',
					'Authorization': `Bearer ${token}`
				}
			}
			
			fetch(path, request)
			.then(response => response.json())
			.then(body => callback(body))
			.catch(err => console.error(err));
		});
	}
}

module.exports = (app, serviceManager) => {
	const studiesService = new StudiesService();
	serviceManager.set('studies-service', studiesService);	
};