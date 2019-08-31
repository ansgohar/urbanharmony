const fetch = require("node-fetch");
const CONFERENCES = require('./../services/service-manager').get('conferences-services');
var express = require('express');

module.exports = function (app) {
    var router = express.Router();

    router.get('/', function (req, res, next) {
        CONFERENCES.getAllConferences(function (data) {
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


    app.use("/conferencesList", router);
}
