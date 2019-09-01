'use strict';

// TODO: Enhance the import statement so that it inquires about the ENV and imports DB config as required
const DB_CONFIG = require('../config/environments/development/database.json');

/**
 * GoogleApi.js controller
 *
 * @description: A set of functions called "actions" of the `google-api` plugin.
 */




function editqueryf(url, MongoClient,params) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("strapi");
      dbo.collection("google.api").update({}, {$set: {"APIKey":params.APIKey,"query":params.query}},function (err, res) {
        if (err) throw err;
        db.close();
        resolve("API Updated Successfully");
      });
    });
  });
}

function deletequeryf(url, MongoClient) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("strapi");
      dbo.collection("google.api").drop(function (err, delOK) {
        if (err) throw err;
        db.close();
        if (delOK)
          resolve('API Deleted Successfully');
      });
    });
  });
}
function insertdefaultapi(url, MongoClient) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("strapi");
      var myobj = { "APIKey": "-1", "query": "Highway 37" };
      dbo.collection("google.api").insertOne(myobj, function (err, res) {
        if (err) throw err;
        db.close();
        resolve(myobj);
      });
    })
  });
}

function createDBIFNE(url, MongoClient) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("strapi");
      dbo.createCollection("google.api", function (err, res) {
        if (err) throw err;
        resolve();
      });
    })
  });
}
function get_API_Query(url, MongoClient) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("strapi");
      dbo.collection("google.api").findOne({}, function (err, result) {
        if (err) throw err;
        db.close();
        resolve(result);
      });
    });
  });
}

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },

  getquery: async (ctx) => {
    // Add your own logic here.
    var MongoClient = require('mongodb').MongoClient;
    // TODO: URL Must include access restriction
    var url = `mongodb://${DB_CONFIG.connections.default.settings.host}:${DB_CONFIG.connections.default.settings.port}/${DB_CONFIG.connections.default.settings.database}`;
    await createDBIFNE(url, MongoClient);
    var data = await get_API_Query(url, MongoClient);
    if (!data)
      data = await insertdefaultapi(url, MongoClient);
    // Send 200 `ok`
    ctx.send({
      message: data
    });
  },
  deletequery: async (ctx) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = `mongodb://${DB_CONFIG.connections.default.settings.host}:${DB_CONFIG.connections.default.settings.port}/${DB_CONFIG.connections.default.settings.database}`;
    var data = await get_API_Query(url, MongoClient);
    if (data)
      data = await deletequeryf(url, MongoClient);
    else
      data = 'No collection to be deleted';
    ctx.send({
      message: data
    });
  },
  editquery: async (ctx) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = `mongodb://${DB_CONFIG.connections.default.settings.host}:${DB_CONFIG.connections.default.settings.port}/${DB_CONFIG.connections.default.settings.database}`;
    var data = await get_API_Query(url, MongoClient);
    if (data)
      data= await editqueryf(url,MongoClient,ctx.request.body); 
    else
      data = 'No collection to be edited';
    ctx.send({
      message: data
    });
  }
};
