// CRUD operations in REST API
const app = require('./app')


// const express = require('express')
// require('./db/mongoose')
// const userRouter = require('./routers/user')
// const taskRouter = require('./routers/task')

// const app = express()
const port = process.env.PORT

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
//**use of multer for file uploads and error handling
// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb){
//         if (!file.originalname.match(/\.(doc|docx)$/)){
//            return cb(new Error('Please Upload a Word Doc'))
//         }

//         cb(undefined, true)
//         // cb(new Error('File must be PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })

//automatically parse incomming json
// app.use(express.json())
// app.use(userRouter, taskRouter)

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

//Virtual relationship between tables.
// const Task = require('./model/task')
// const User = require('./model/user')

// const main = async () => {
//   // const task = await Task.findById('5e4ead7f04d51e34f4e1efde')
//   // await task.populate('owner').execPopulate()
//   // console.log(task.owner)
//      const user = await User.findById('5e4ead6a04d51e34f4e1efdc')
//      await user.populate('tasks').execPopulate()
//      console.log(user.tasks)
//     }

// main()