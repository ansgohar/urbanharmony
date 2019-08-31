'use strict';

const express = require('express');
const fetch = require('node-fetch');
const axios = require('axios');

module.exports = function(app){

  const router = express.Router();

  router.get('/', (req, res) => {

    let url = 'http://localhost:3000/advSearch';

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    let payload = {
      dir: 'surveylists',
      filters: {status: \"exists\"},
      fields: ["fullAddress","buildingName","registrationNumber","buildingType","buildingValue","buildingNumber", "status"]
    };

    options['body'] = JSON.stringify(payload);

    console.log(options);

    /*axios(options)
      .then(response => res.json(response.data))
      .catch(err => console.log(err));*/

    fetch(url, options)
      .then(res => {return res.json()})
      .then(body => res.json(body));
      
  });

  app.use('/test', router);
};