const express = require('express')
const User = require('../model/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendwelcomeEmail, sendCancleEmail } = require('../emails/account')
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
        sendwelcomeEmail(user.email, user.name)
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
      // One way to limit user data
        //  res.send({ user: user.getPublicProfile(), token })
        // second way
        res.send({ user, token })
    } catch(e){
        res.status(400).send()
    }
})

//logout
router.post('/users/logout', auth, async (req, res) => {
    try {
       req.user.tokens = req.user.tokens.filter((token) => {
           return token.token !== req.token
       })
       await req.user.save()
       res.send()
    } catch (e){
       res.status(500).send()
    }
})

//logout from all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
       req.user.tokens = []
       await req.user.save()
       res.send()
    } catch (e){
        res.status(500).send()
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
//Add middle ware fun as an argument
router.get('/users/me', auth , async (req, res) => {
    res.send(req.user)
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

//* Update the data using patch

router.patch('/users/me', auth, async (req, res) => {
const updates = Object.keys(req.body)
const allowedUpdates = ['name', 'email', 'password', 'age']
const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Update' })
}
try {
    //Modified the querry as it bypasses the mongoose middleware and used a work around
  // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  //const user = await User.findById(req.user._id)  
  updates.forEach((update) => 
      req.user[update] = req.body[update]
  )
  await req.user.save()
    res.send(req.user)
} catch (e) {
     res.status(400).send(e)
}
})

//* Delete to delete
router.delete('/users/me', auth, async (req, res) => {
try {
//   const user = await User.findByIdAndDelete(req.user._id)
//   if(!user){
//       return res.status(404).send()
//   } Remove method on mongoose doc
  await req.user.remove()
  sendCancleEmail(req.user.email, req.user.name)
  res.send(req.user)
} catch(e){
   res.status(500).send()
}
})
// setting up multer to handle file uploads and using sharp to handle file size and extension
const upload = multer({
   // dest: 'avatar',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
           return cb(new Error('Please Upload a valid image'))
        }
        cb(undefined, true)
    }
})
//creating and updating the images
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    //req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
    }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send('Successfully uploaded the image')
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
//Deleting user profile images
router.delete('/users/me/avatar', auth, async (req, res) => {
    if (req.user.avatar) {
        req.user.avatar = undefined
        await req.user.save()
        res.send('Deleted Profile Pic successfully')
    } else {
        res.status(404).send({ error: 'No image is present' })
    }

})

//Fetch the image
router.get('/users/:id/avatar', async (req, res) => {
    try {
       const user = await User.findById(req.params.id)
       if (!user || !user.avatar ) {
          throw new Error()
       }
       res.set('Content-Type', 'image/png')
       res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})
module.exports = router