// CRUD operations in REST API

const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000
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
