//CRUD Create Read Update and Delete
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

//define connection URL we are going to connect
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {

})