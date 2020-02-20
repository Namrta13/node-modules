// CRUD operations in REST API

const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

 //setting up express middleware function to execute before running the route handlers
//  app.use((req, res, next) => {
//  //  console.log(req.method, req.path)
//  //  next()
//     if (req.method === 'GET'){
//       res.send('GET requests are disabled')
//     } else {
//         next()
//     }
//  })
// Dummy middleware code
// app.use((req, res, next) => {
//     if (req) {
//         res.status(503).send('The server is Unavailable')
//     }
// })


//automatically parse incomming json
app.use(express.json())
app.use(userRouter, taskRouter)

//** How to set up routers using express
// const router = new express.Router()
// router.get('/test', (req, res) => {
//     res.send('This is from my other router')
// })

// app.use(router)
//end

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

//* bCRYPT HASHING ALGO for passwords

// const bcrypt = require('bcryptjs')
// const myFunction = async () => {
//    const password = 'Red1234!'
//    const hashPassword = await bcrypt.hash(password, 8)
//    console.log(password)
//    console.log(hashPassword)

//    const isMatch = await bcrypt.compare('Red1234!', hashPassword)
//    console.log(isMatch)
//  }

// myFunction()


//* JWT library working with the tokens
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//      const token = jwt.sign({ _id: 'abcd1234' }, 'mytakencourse', { expiresIn: '1 seconds'})
//      console.log(token) 

//      const data = jwt.verify(token, 'mytakencourse')
//      console.log(data)
//     }

// myFunction()

// const pet = {
//     name: 'Dobo'
// }

// pet.toJSON = function () {
//   //  console.log(this)
//     return {}
// }
// console.log(JSON.stringify(pet))

const Task = require('./model/task')

const main = async () => {
  const task = await Task.findById('5e4e7f8b99d1263980c3ecbb')
  
  console.log(task.owner)
}

main()