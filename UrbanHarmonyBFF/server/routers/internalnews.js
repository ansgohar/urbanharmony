const fetch = require("node-fetch");
const NEWS = require('./../services/service-manager').get('internal-services');
var express = require('express');

module.exports = function (app) {
    var router = express.Router();

    router.get('/', function (req, res, next) {
        NEWS.getallinternalnews(function (data) {
            if (Object.keys(data).length == 0) {
                res.json([]);
            }
            else {
                res.json(data);
            }
        });

    });


    router.get('/:limit', function (req, res, next) {
        NEWS.getlimitednews(req.params.limit, function (data) {
            if (Object.keys(data).length == 0) {
                res.json([]);
            }
            else {
                res.json(data);
            }
        });


    });

    router.get('/id/:id', function (req, res, next) {
        console.log(req.params);
        NEWS.getnewsbyID(req.params.id, function (data) {
            if (Object.keys(data).length == 0) {
                res.json([]);
            }
            else {
                res.json(data);
            }
        });


    });




    app.use("/internalnews", router);
}