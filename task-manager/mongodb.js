//CRUD Create Read Update and Delete
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

//define connection URL we are going to connect
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error){
      return console.log('Unable to connect to database')
    }

    //console.log('Connected correctly')
    //This gives us the db we require
    //* CREATED DB AND INSERTED DATA
    const db = client.db(databaseName)
//* single doc insert
//     db.collection('users').insertOne({
//         name: 'Namrta',
//         age: 25
//     }, (error, result) => {
//         if(error){
//          return console.log('Unable to insert user')
//         }
//          console.log(result.ops)
//     })

//* multiple doc inserts
//     db.collection('users').insertMany([{
//         name: 'Aayush',
//         age: 24
//     }, {
//         name: 'Arpita',
//         age: 27
//     }
// ], (error, result) => {
//     if (error){
//         return console.log('Unable to insert')
//     }
//     console.log(result.ops)
// })
       db.collection('tasks').insertMany([
           {
               description: 'To open notepad',
               completed: true
           },
            {
               description: 'To play music',
               completed: false
           },
           {
               description: 'To set an alarm',
               completed: false
           }
       ], (error, result) => {
           if (error) {
               return console.log('Unable to insert documents')
           }
            console.log(result.ops)
        })
        //created and inserted done
})