//CRUD Create Read Update and Delete
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

//define connection URL we are going to connect
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//Object id hex
// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

//mongo client connection
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
//        // _id: id,
//         name: 'Disha',
//         age: 29
//     }, (error, result) => {
//         if(error){
//          return console.log('Unable to insert user')
//         }
//          console.log(result.ops)
//     })

// //* multiple doc inserts
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
    //    db.collection('tasks').insertMany([
    //        {
    //            description: 'To open notepad',
    //            completed: true
    //        },
    //         {
    //            description: 'To play music',
    //            completed: false
    //        },
    //        {
    //            description: 'To set an alarm',
    //            completed: false
    //        }
    //    ], (error, result) => {
    //        if (error) {
    //            return console.log('Unable to insert documents')
    //        }
    //         console.log(result.ops)
    //     })
//         created and inserted done

//  **  Read the data from db
//     db.collection('users').findOne({ name: 'Aayush', age: 1 }, (error, user) => {
//        if (error){
//            return console.log('Unable to fetch')
//        }
//        console.log(user)
//     })       
//     //search by ID
//     db.collection('users').findOne({ _id: new ObjectID("5e479c2b03371d00201a45ac") }, (error, user) => {
//         if (error){
//             return console.log('Unable to fetch')
//         }
//         console.log(user)
//      }) 
//      ** Read multiple data
//      db.collection('users').find({ age: 25 }).toArray((error, users) => {
//        console.log(users)
//      })
//      db.collection('users').find({ age: 25 }).count((error, users) => {
//         console.log(users)
//       })

//       db.collection('tasks').findOne({ _id: new ObjectID("5e46d6661f25cb0f70e5f635") }, (error, user) => {
//         if (error){
//             return console.log('Unable to fetch')
//         }
//         console.log(user)
//      }) 
//      db.collection('tasks').find({ completed: false }).toArray((error, user) => {
//         if (error){
//             return console.log('Unable to fetch')
//         }
//         console.log(user)
//      }) 

// ** Update the data in mongoDB using update operators
//       db.collection('users').updateOne({
//           _id: new ObjectID("5e46d2820bd48f2288c050a9")
//       }, {
//           $set: {
//               name: 'Mike'
//           }
//       }).then((result) => {
//           console.log(result)
//       }).catch((error) => {
//           console.log(error)
//       })
//     db.collection('users').updateOne({
//         _id: new ObjectID("5e46d2820bd48f2288c050a9")
//     }, {
//         $inc: {
//             age: 2
//         }
//     }).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })
    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     } 
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
//** Delete the document
    //  db.collection('users').deleteMany({
    //      age: 27
    //  }).then((result) => {
    //      console.log(result)
    //  }).catch((error) => {
    //      console.log(error)
    //  })    
    // db.collection('tasks').deleteOne({
    //     description: 'To open notepad'
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
})