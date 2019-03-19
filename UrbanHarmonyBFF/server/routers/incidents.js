const fetch = require("node-fetch");
const Incidents = require('./../services/service-manager').get('incidents-services');
var express = require('express');

module.exports = function (app) {
    var router = express.Router();

    router.get('/', function (req, res, next) {
        Incidents.getAllIncidents(function (data) {
            if (Object.keys(data).length == 0) {
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


    router.get('/:id', function (req, res, next) {
        Incidents.getIncidentByID(req.params.id,function(data) {
            if (Object.keys(data).length == 0) {
                res.json([]);
            }
            else {
                res.json(data);
            }
        });
    });


    app.use("/incidents", router);
}