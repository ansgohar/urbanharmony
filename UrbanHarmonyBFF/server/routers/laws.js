const fetch = require("node-fetch");
const LAWS = require('./../services/service-manager').get('laws-services');
var express = require('express');

module.exports = function (app) {
    var router = express.Router();

    router.get('/laws', function (req, res, next) {
        LAWS.getAllLaws(function (data) {
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


    router.get('/borders', function (req, res, next) {
        LAWS.getAllBorders(function (data) {
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

    router.get('/guidelines', function (req, res, next) {
        LAWS.getAllGuidelines(function (data) {
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

    app.use("/lawsborders", router);
}