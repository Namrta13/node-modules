require('../src/db/mongoose')
const User = require('../src/model/user')


//5e4a3bdcdcf853439cc69f17

// User.findByIdAndUpdate('5e4a41c9ff0d6e41e4dd8d4a', {
//     age: 1
// }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeCount = async (id, age) => {
     const user = await User.findByIdAndUpdate(id, { age })
     const count = await User.countDocuments({ age })
     return count
}

updateAgeCount('5e4a41c9ff0d6e41e4dd8d4a', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})