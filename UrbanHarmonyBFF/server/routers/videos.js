const fetch = require("node-fetch");
const VIDEOS = require('./../services/service-manager').get('videos-services');
var express = require('express');

module.exports = function (app) {
    var router = express.Router();

    router.get('/', function (req, res, next) {
        VIDEOS.getAllVideos(function (data) {
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


    app.use("/videos", router);
}