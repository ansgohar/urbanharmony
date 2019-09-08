const fetch = require("node-fetch");
const competitionService = require('./../services/service-manager').get('competition-services');
var express = require('express');
var bodyParser = require('body-parser')


module.exports = function (app) {
    var router = express.Router();
    app.use(bodyParser());

    router.get('/current', function (req, res, next) {
        competitionService.getCompetitionOfTheMonth(function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            }
            else {
                res.json(data);
            }
        });

    });

    router.get('/', function (req, res, next) {
        competitionService.getAllCompetition(function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            }
            else if (Array.isArray(data)) {
                res.json(data);
            }
            else {
                res.json([data]);
            }
        }
        );
    });


    router.get('/winners', function (req, res, next) {
        competitionService.getCompetitionWinners(function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            }
            else if (Array.isArray(data)) {
                res.json(data);
            }
            else {
                res.json([data]);
            }
        }
        );
    });

    router.get('/:ID', function (req, res, next) {
        competitionService.getCompetitionByID(req.params.ID,function (data) {
            if (data === undefined || Object.keys(data).length == 0) {
                res.json([]);
            } else {
                res.json([data]);
            }
        }
        );
    });

    router.post('/', function (req, res) {
        //////console.log(req.body);
        competitionService.subscribeToTheCompetition(req.body, function (data) {
            res.json(data);
        })
    });

    router.put('/', function (req, res) {
        //////console.log(req.body);
        competitionService.sendPics(req.body, function (data) {
            res.json(data);
        });
    });


    app.use("/competition", router);
}