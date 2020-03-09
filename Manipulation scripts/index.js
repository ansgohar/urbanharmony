'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbConfig = require('./config/DB_Config');

const connectionURL = dbConfig.connectionURL;
const dbName = dbConfig.db;

const client = new MongoClient(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



client.connect(err => {
    assert.strictEqual(null, err);
    console.info('>', 'Connected to server successfully!');

    const db = client.db(dbName);
    const collection = db.collection('surveylist');

    collection
        .find({})
        .toArray((err, docs) => {
            assert.strictEqual(err, null);

            docs.forEach(async doc => {
                let docID = doc._id;

                try {
                    await collection.updateOne({_id: docID}, {$set: {genID: docID}});
                } catch (err) {
                    console.error(err.message);
                }
            });
        });
});