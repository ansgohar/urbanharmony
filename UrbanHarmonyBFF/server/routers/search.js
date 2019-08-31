'use strict';

const search = require('../services/service-manager').get('search-service');
const express = require('express');

module.exports = function (app) {

    const router = express.Router();

    router.post('/', function (req, res) {
        try {
            
            console.log(req.body);
            search.advanceSearch(req.body, function (response) {
                if (response === undefined || Object.keys(response).length === 0) {
                    res.json({});
                } else {
                    res.json(response);
                }
            });
        } catch (err) {
            console.error(err);
        }
    });

    app.use('/advSearch', router);
};