const fetch = require("node-fetch");
const articles = require('./../services/service-manager').get('article-services');
var express = require('express');

module.exports = function (app) {
    var router = express.Router();

    router.get('/', function (req, res, next) {
        articles.getallnews(function (data) {
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


    router.get('/:limit', function (req, res, next) {
        articles.getlimited(req.params.limit, function (data) {
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

    app.use("/articles", router);
}
