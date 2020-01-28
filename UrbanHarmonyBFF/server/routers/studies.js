'use strict';

const router = require('express').Router();
const studies = require('../services/service-manager').get('studies-service');

module.exports = (app) => {

	router.get('/', (req, res) => {
		try {
			studies.getStudies(null, data => {
				if (data === undefined) {
					return res.status(500).json({error: 'Internal server error'});				
				}

				if (Array.isArray(data)) {
					res.status(200).json(data);
				} else {
					res.status(200).json([data]);
				}
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).json({error: 'Internal server error'});
		}	
	});
	
	app.use('/studies', router);	
};