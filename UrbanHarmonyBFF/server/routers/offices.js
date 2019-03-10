const fetch = require("node-fetch");
const OFFICES = require('./../services/service-manager').get('offices-services');
var express = require('express');

module.exports = function (app) {
    var router = express.Router();

    router.get('/', function (req, res, next) {
        OFFICES.getAllOffices(function (data) {
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


    router.get('/id/:id', function (req, res, next) {
        OFFICES.getOfficeByID(req.params.id,function(data) {
            if (Object.keys(data).length == 0) {
                res.json([]);
            }
            else {
                res.json(data);
            }
        });
    });


    app.use("/offices", router);
}