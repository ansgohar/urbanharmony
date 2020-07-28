'use strict';

const SPOTLIGHT = require('../services/service-manager').get('spotlight-service');
const router = require('express').Router();

module.exports = (app) => {
    router.get('/', (req, res) => {
        let limit = req.query.limit;
        console.log('hello')
        SPOTLIGHT.getSpotlight(limit, (data) => {
           if (data.length === 0) {
               res.send('https://via.placeholder.com/560x315');
           } else {
               let spotlight = data[0].url.split('https://youtu.be/').pop();
               res.send(`https://www.youtube.com/embed/${spotlight}`);
           }
        });
    });

    app.use('/spotlight', router);
}