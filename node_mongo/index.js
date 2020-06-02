const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const dboper = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion'

MongoClient.connect(url).then((client) => {



    console.log('Connected correctly to server')

    const db = client.db(dbname)

    dboper.insertDocument(db, { name: 'Vader', description: 'Test' }, 'dishes')
        .then((result) => {
            console.log('Insert Document:\n', result.ops)
            return dboper.findDocuments(db, 'dishes')
        })
        .then((docs) => {
            console.log('Found documents:\n', docs)
            return dboper.updateDocument(db, { name: 'Vader' }, { description: 'Updated Test' }, 'dishes')
        })
        .then((result) => {
            console.log('Updated Document:\n', result.result)
            return dboper.findDocuments(db, 'dishes')
        })
        .then((docs) => {
            console.log('Found documents:\n', docs)
            return db.dropCollection('dishes')
        })
        .then((result) => {
            console.log('Dropped collection: ', result)
            return client.close()
        })
})
    .catch((err) => console.log(err))