const mongoose = require('mongoose')
const validator = require('validator')

//Create Schema to use Middleware
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
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
    }
  })

userSchema.pre('save', async function (next) {
    const user = this
    console.log('jusr before saving')

    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User