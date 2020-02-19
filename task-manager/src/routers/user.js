const express = require('express')
const User = require('../model/user')
const router = new express.Router()

//* Normal Promise way
// app.post('/users', (req, res) => {
//     const user = new User(req.body)
//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })
//* Async await function calls
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
    
})

//User Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch(e){
        res.status(400).send()
    }
})

//* Promise way
// app.get('/users', (req, res) => {
//       User.find({}).then((users) => {
//            res.send(users)
//       }).catch((e) => {
//         res.status(500).send()
//       })
// })

//* Async await
router.get('/users', async (req, res) => {
try {
  const users = await User.find({})
  res.send(users)
} catch (e){
res.status(500).send()
}
})
//* Promise way
// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id
//     User.findById(_id).then((user)=> {
//         if(!user) { 
//            return res.status(404).send()
//         }

//         res.send(user)
//     }).catch((e) => {
//              res.status(500).send()
//     })
//     console.log(req.params)
//     // User.find({ _id: id }).then((user) => {
//     //      res.send(user)
//     // }).catch((e) => {
//     //   res.status(500).send()
//     // })
// })
//* Async Await 
router.get('/users/:id', async (req, res) => {
const _id = req.params.id    
try {
   const user = await User.findById(_id)
   if (!user) {
       return res.status(404).send()
   }  
   res.send(user)
    } catch (e) {
      res.status(500).send()
    }
})


//* Update the data using patch

router.patch('/users/:id', async (req, res) => {
const updates = Object.keys(req.body)
const allowedUpdates = ['name', 'email', 'password', 'age']
const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Update' })
}
try {
    //Modified the querry as it bypasses the mongoose middleware and used a work around
  // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  const user = await User.findById(req.params.id)  
  updates.forEach((update) => 
      user[update] = req.body[update]
  )
  await user.save()
  if (!user){
       return res.status(404).send()
    }
    res.send(user)
} catch (e) {
     res.status(400).send(e)
}
})

//* Delete to delete
router.delete('/users/:id', async (req, res) => {
try {
  const user = await User.findByIdAndDelete(req.params.id)
  if(!user){
      return res.status(404).send()
  }
  res.send(user)
} catch(e){
   res.status(500).send()
}
})

module.exports = router