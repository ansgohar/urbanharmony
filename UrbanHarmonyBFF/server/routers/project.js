const fetch = require("node-fetch");
const project = require('./../services/service-manager').get('project-services');
var express = require('express');

module.exports = function (app) {
    var router = express.Router();

    router.get('/:status', function (req, res, next) {
        project.getprojects(req.params.status,function(data) {
            if(Object.keys(data).length == 0){
                res.json([]);
            }
            else{
            res.json(data);
            }
        });
    });


    router.get('/all/:status', function (req, res, next) {
        project.getAllProjects(req.params.status,function(data) {
            if(Object.keys(data).length == 0){
                res.json([]);
            }
            else{
            res.json(data);
            }
        });
    });


    router.get('/id/:id', function (req, res, next) {
        project.getProjectByID(req.params.id,function(data) {
            if(Object.keys(data).length == 0){
                res.json([]);
            }
            else{
            res.json(data);
            }
        });
    });

    app.use("/project", router);
}
