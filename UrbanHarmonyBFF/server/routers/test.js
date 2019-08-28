'use strict';

const express = require('express');
const fetch = require('node-fetch');

module.exports = function(app){

  const router = express.Router();

  router.get('/', (req, res) => {

    let url = 'http://localhost:3000/conferencesList';
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    };

    console.log(options);

    fetch(url, options)
      .then(res => res.json())
      .then(body => res.json(body))
      .catch(err => console.err);

  });

  app.use('/test', router);
}