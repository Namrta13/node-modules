const express = require('express')
const Tasks = require('../model/task')
const router = new express.Router()

//** Promise way
// app.post('/tasks', (req, res) => {
//     const task = new Tasks(req.body)
//     task.save().then(() => {
//         res.status(201).send(task)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })

// })

// app.get('/tasks', (req, res) => {
//     Tasks.find({}).then((tasks) => {
//          res.send(tasks)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

// app.get('/tasks/:id', (req, res) => {
//     const _newid = req.params.id
//     Tasks.findById(_newid).then((taskValue) => {
//          if (!taskValue) {
//              return res.status(404).send()
//          }

//          res.send(taskValue)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

//* Async Await way
router.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body)
    try {
      await task.save()  
      res.status(201).send(task)
    } catch (e) {
       res.status(400).send(e)
    }

})

router.get('/tasks', async (req, res) => {
    try {
       const tasks = await Tasks.find({})   
       res.send(tasks)
    } catch (e) {
       res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _newid = req.params.id
    try {
        const task = await Tasks.findById(_newid)
        if (!task) {
           return res.status(404).send()
        }
        res.send(task)
    } catch(e){
       res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const upds = Object.keys(req.body)
    const allowedVals = ['description', 'completed']
    const validVal = upds.every((update) => allowedVals.includes(update))
    if(!validVal){
       return res.status(400).send({ error: 'Invalid Update' })
    }
    
    try {
      const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      if (!task) {
         return res.status(404).send()
      }
      res.send(task)
    } catch (e){
      res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
       const task = await Tasks.findByIdAndDelete(req.params.id)
       if(!task){
           res.status(404).send()
       }
       res.send(task)
    } catch (e){
        res.status(500).send(e)
    }
})

module.exports = router