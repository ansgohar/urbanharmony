const fetch = require("node-fetch");
const BOOKS = require('./../services/service-manager').get('books-services');
var express = require('express');

module.exports = function (app) {
    var router = express.Router();

    router.get('/', function (req, res, next) {
        BOOKS.getAllBooks(function (data) {
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


    app.use("/books", router);
}
