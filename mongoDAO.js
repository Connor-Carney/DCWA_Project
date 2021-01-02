const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'headsOfStateDB';
const collName = 'stateHead'

var headsOfStateDB;
var stateHead;

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((client) => {
        headsOfStateDB = client.db(dbName)
        headsOfState = headsOfStateDB.collection(collName)
    }) 
    .catch((error) => {
        console.log(error)
    }) 
   
// function to get the State head list
var getHeadsOfState = function() {
    return new Promise((resolve, reject) => {
       
        var cursor = headsOfState.find()
      
        cursor.toArray()
            .then((documents) => {
                resolve(documents)
            }) 
            .catch((error) => {
                reject(error)
            }) 
    }) 
} 

module.exports = { getHeadsOfState }