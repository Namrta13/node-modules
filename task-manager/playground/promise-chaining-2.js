require('../src/db/mongoose')
const Tasks = require('../src/model/task')

// Tasks.findByIdAndDelete('5e4a35fc9df2c01d18867598').then((res) => {
//     console.log(res)
//     return Tasks.countDocuments({ completed: false })
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskandCount = async (id) => {
    const task = await Tasks.findByIdAndDelete(id)
    const count = await Tasks.countDocuments({ completed: false })
    return count
}

deleteTaskandCount('5e4bd81ae9d08e49f4efbd81').then((result) => {
    console.log('count ', result)
}).catch((e) => {
    console.log(e)
})