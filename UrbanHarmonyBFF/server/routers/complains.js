const fetch = require("node-fetch");
const complains = require('./../services/service-manager').get('complain-services');
const petitions = require('./../services/service-manager').get('petition-services');
var express = require('express');


module.exports = function (app) {
    var router = express.Router();

    router.get('/', function (req, res, next) {
        complains.getSurveyList(function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            }
            else if (Array.isArray(data)) {
                let modifiedData = data.map(entry => {
                    if (entry.value)
                        entry.value = '-';

                    return entry;
                });
                res.json(modifiedData);
            }
            else {
                if (data.value)
                    data.value = '-';
                res.json([data]);
            }
        });

    });


    router.get('/surveySearch/:query', function (req, res, next) {
        complains.getSearchResults(req.params.query, function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            }
            else if (Array.isArray(data)) {
                let modifiedData = data.map(entry => {
                    if (entry.value)
                        entry.value = '-';

                    return entry;
                });
                res.json(modifiedData);
            }
            else {
                if (data.value)
                    data.value = '-';
                res.json([data]);
            }
        });

    });

    router.get('/surveyAddress/:address', function (req, res, next) {
        complains.searhByAddressInSurveylist(req.params.address, function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            }
            else if (Array.isArray(data)) {
                let modifiedData = data.map(entry => {
                    if (entry.value)
                        entry.value = '-';

                    return entry;
                });
                res.json(modifiedData);
            }
            else {
                if (data.value)
                    data.value = '-';
                res.json([data]);
            }
        });

    });

    router.get('/complainsSearch/:searchQuery', function (req, res, next) {
        complains.getComplainsSearchResults(req.params.searchQuery, function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            }
            else if (Array.isArray(data)) {
                let modifiedData = data.map(entry => {
                    if (entry.value)
                        entry.value = '-';

                    return entry;
                });
                res.json(modifiedData);
            }
            else {
                if (data.value)
                    data.value = '-';
                res.json([data]);
            }
        });

    });

    router.get('/complainAddress/:address', function (req, res, next) {
        complains.searchByAddressInComplainslist(req.params.address, function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            }
            else if (Array.isArray(data)) {
                let modifiedData = data.map(entry => {
                    if (entry.value)
                        entry.value = '-';

                    return entry;
                });
                res.json(modifiedData);
            }
            else {
                if (data.value)
                    data.value = '-';
                res.json([data]);
            }
        });

    });

    router.get('/governorate', function (req, res, next) {
        complains.getGovernorates(function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            }
            else {
                res.json(data);
            }
        });

    });

    router.get('/regions/:id', function (req, res, next) {
        complains.getRegionsByGovernorate(req.params.id, function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            }
            else if (Array.isArray(data)) {
                res.json(data);
            }
            else {
                res.json([data]);
            }
        });

    });


    router.get('/list', function (req, res, next) {
        complains.getAllComplainsList(function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            }
            else if (Array.isArray(data)) {
                let modifiedData = data.map(entry => {
                    if (entry.value)
                        entry.value = '-';

                    return entry;
                });
                res.json(modifiedData);
            }
            else {
                if (data.value)
                    data.value = '-';
                res.json([data]);
            }
        });

    });

    router.get('/petition', function (req, res, next) {
        petitions.getAllPetitions(function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            }
            else if (Array.isArray(data)) {
                let modifiedData = data.map(entry => {
                    if (entry.surveylist && entry.surveylist.buildingValue)
                        entry.surveylist.buildingValue = '-';

                    return entry;
                })
                res.json(data);
            }
            else {
                data.surveylist.buildingValue = '-';
                res.json([data]);
            }
        });
    
    });
    
    app.use("/complains", router);
}



