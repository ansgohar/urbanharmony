'use strict';

// TODO: Enhance the import statement so that it inquires about the ENV and imports DB config as required
const DB_CONFIG = require('../config/environments/development/database.json');

/**
 * SearchAll.js controller
 *
 * @description: A set of functions called "actions" of the `search-all` plugin.
 */

function get_content(url, MongoClient, name, query) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("strapi");
      dbo.collection(name).find({ $text: { $search: query}}).limit(10).toArray(function (err, result) {
        if (err) throw err;
        db.close();
        resolve(result);
      });
    });
  });
}

function createIndex(url, MongoClient, name) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("strapi");
      dbo.collection(name).createIndex({ "$**": "text" },function (err, result) {
        if (err) throw err;
        db.close();
        resolve(result);
      });
    });
  });
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

function get_collection_names(url, MongoClient) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("strapi");
      dbo.listCollections().toArray(function (err, result) {
        if (err) throw err;
        db.close();
        let collectionNames = result;

        for (var i = 0, len = collectionNames.length; i < len; i++) {
          delete collectionNames[i].options;
          if (collectionNames[i].name == 'users-permissions_permission' || collectionNames[i].name == 'users-permissions_role' || collectionNames[i].name == 'system.indexes' || collectionNames[i].name == 'core_store' || collectionNames[i].name == 'users-permissions_user')
            delete collectionNames[i];
        }
        collectionNames = cleanArray(collectionNames);
        resolve([collectionNames, collectionNames.length]);
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

  createIndex: async (ctx)=>{

    var MongoClient = require('mongodb').MongoClient;
    // TODO: URL Must include access restriction
    var url = `mongodb://${DB_CONFIG.connections.default.settings.host}:${DB_CONFIG.connections.default.settings.port}/${DB_CONFIG.connections.default.settings.database}`;

    var cn = await get_collection_names(url,MongoClient)
    for (var i = 0; i < cn[0].length; i++) {
      await createIndex(url,MongoClient,cn[0][i].name)
    }
    ctx.send({
      message: 'Indecies created successfully'
    });
  },

  index: async (ctx) => {
    // Add your own logic here.
    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },
  search: async (ctx) => {
    // Add your own logic here.
    var MongoClient = require('mongodb').MongoClient;
    var url = `mongodb://${DB_CONFIG.connections.default.settings.host}:${DB_CONFIG.connections.default.settings.port}/${DB_CONFIG.connections.default.settings.database}`;
    

    var data =  ['termsandabout', 'article', 'internalnews','conferences', 'news', 'competitions', 'projects']
    //await get_collection_names(url, MongoClient);
    var query = decodeURIComponent(ctx.params.find);
    var contents = [];
    for (var i = 0; i < data.length; i++) {
      var content = await get_content(url, MongoClient, data[i], query)
      console.log(content);
      console.log(data[i]);
      if (content.length != 0)
      {
        console.log(content);
        var mergedObject = {...{'contentType': data[i]} ,...content};
        console.log(mergedObject);
        contents.push(mergedObject);
      }
    }
    // Send 200 `ok`
    ctx.send(
       contents
    );
  }
};
