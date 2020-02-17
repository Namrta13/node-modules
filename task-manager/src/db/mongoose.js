//mongoose npm module connection and model creation and instance creation and inbuilt valiadtion properties.
//Validator npm module to add explicit validations

const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true, useCreateIndex: true,
    useUnifiedTopology: true
})

// const User = mongoose.model('User', {
//   name: {
//       type: String,
//       required: true,
//       trim: true
//   },
//   email: {
//       type: String,
//       required: true,
//       trim: true,
//       lowercase: true,
//       validate(value){
//           if (!validator.isEmail(value)){
//               throw new Error('Email is invalid')
//           }
//       }
//   },
//   password: {
//        type: String,
//        required: true,
//        trim: true,
//        minlength: 6,
//        validate(value){
//            if(value.includes('password')){
//                throw new Error('Enter a valid password')
//            }
//        }
//   },
//   age: {
//       type: Number,
//       default: 0,
//       validate(value){
//           if(value < 0){
//               throw new Error('Age must be a positive number')
//           }
//       }
//   }
// })

// const me = new User({
//     name: 'Namrta',
//     age: 24
// }).save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!' + error)
// })

// const me = new User({
//    name: '  Namrta  ',
//    email: 'NAMRTA@abc.com    '
// })
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!' + error)
// })
// const me = new User({
//     name: '  Arpita  ',
//     email: 'Arpita@abc.com    ',
//     password: 'namrta123    '
//  })
//  me.save().then(() => {
//      console.log(me)
//  }).catch((error) => {
//      console.log('Error!' + error)
//  })

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true  
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const first = new Tasks({
    description: 'To learn a new tech'
})

first.save().then(() => {
    console.log(first)
}).catch((error) => {
    console.log(error)
})