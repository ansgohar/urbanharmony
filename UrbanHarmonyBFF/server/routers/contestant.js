'use strict';

const router = require('express').Router();
const contestantService = require('../services/service-manager').get('contestant-service');

module.exports = (app) => {

    router.post('/', (req, res) => {
        try {
            contestantService.registerContestant(req.body, (response) => {
                if (!response || response.message && response.message.includes('internal server error')) {
                    return res.status(500).json({
                        error: 'Server error'
                    });
                }

                res.status(201).json({
                    info: 'Contestant registered successfully!'
                });
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Server error'});
        }
    });

    app.use('/contestant', router);
}