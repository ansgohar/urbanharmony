const fetch = require("node-fetch");
const SEARCH = require('./../services/service-manager').get('global-search-services');
var express = require('express');

module.exports = function (app) {
    var router = express.Router();

    router.get('/:value', function (req, res, next) {
        SEARCH.searchAllContents(req.params.value,function (data) {
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



    app.use("/globalsearch", router);
}