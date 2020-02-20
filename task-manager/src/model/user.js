const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Tasks = require('./task')

//Create Schema to use Middleware
// unique true on email to use unique email for every user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
         type: String,
         required: true,
         trim: true,
         minlength: 6,
         validate(value){
             if(value.includes('password')){
                 throw new Error('Enter a valid password')
             }
         }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
  })


//Virtual Relation of user and task this is for mongoose to understand
userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})
//Method to hide user data 1st
// userSchema.methods.getPublicProfile = function () {
//     const user = this
//     const userObject = user.toObject()
//     delete userObject.password
//     delete userObject.tokens


//     return userObject
// }

//Method to hide user data 2nd
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens


    return userObject
}
//Generate the tokens
userSchema.methods.generateAuthToken =  async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'mynewCourse')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
} 
// Define a method on schema using statics to log user in and reuse method
userSchema.statics.findByCredentials = async (email, password) => {
   const user = await User.findOne({ email })

   if (!user) {
       throw new Error('Unable to login')
   }

   const isMatch = await bcrypt.compare(password, user.password)
   
   if (!isMatch){
       throw new Error('Unable to login')
   }
    return user
}

  //Password hashing using bcrypt before saving
userSchema.pre('save', async function (next) {
    const user = this
    console.log('jusr before saving')
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//Delete User tasks when user is removed
userSchema.pre('remove', async function (next){
    const user = this
    await Tasks.deleteMany({ owner: user._id })

    next()
})
const User = mongoose.model('User', userSchema)


module.exports = User