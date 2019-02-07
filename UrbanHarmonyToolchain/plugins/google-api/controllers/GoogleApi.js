'use strict';

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
    var url = "mongodb://admin:NeverLooseFaithInCats@ds117730.mlab.com:17730/strapi";
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
    var url = "mongodb://admin:NeverLooseFaithInCats@ds117730.mlab.com:17730/strapi";
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
    var url = "mongodb://admin:NeverLooseFaithInCats@ds117730.mlab.com:17730/strapi";
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
