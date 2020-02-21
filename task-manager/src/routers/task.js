const express = require('express')
const Tasks = require('../model/task')
const auth = require('../middleware/auth')
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
router.post('/tasks', auth, async (req, res) => {
  //  const task = new Tasks(req.body)
  const task = new Tasks({
      ...req.body, 
      owner: req.user._id
  })  
  try {
      await task.save()  
      res.status(201).send(task)
    } catch (e) {
       res.status(400).send(e)
    }

})
//GET /tasks?completed=val
//Pagination implementation 
//limit and skip
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt_asc || _desc or :asc 
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed) {
      match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        //2 ways
    //   const tasks = await Tasks.find({ owner: req.user._id })   
   // await req.user.populate('tasks').execPopulate()  
    await req.user.populate({
        path: 'tasks',
        match,
        options: {
            limit : parseInt(req.query.limit),
            skip : parseInt(req.query.skip),
            // sort: {
            //     completed: 1
            // }
            sort
        }
    }).execPopulate()
   res.send(req.user.tasks)
    } catch (e) {
       res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
   //await req.user.populate('tasks').execPopulate()
   //const _id = req.user.tasks._id 
   
   try {
       // const task = await Tasks.findById(_newid)
       const task = await Tasks.findOne({ _id, owner: req.user._id }) 
       if (!task) {
           return res.status(404).send()
        }
        res.send(task)
    } catch(e){
       res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const upds = Object.keys(req.body)
    const allowedVals = ['description', 'completed']
    const validVal = upds.every((update) => allowedVals.includes(update))
    if(!validVal){
       return res.status(400).send({ error: 'Invalid Update' })
    }
    
    try {
      //const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id })    
      //const task = await Tasks.findById(req.params.id)
      

      if (!task) {
         return res.status(404).send()
      }

      upds.forEach((updval) => task[updval] = req.body[updval] )

      await task.save()

      res.send(task)
    } catch (e){
      res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
      // const task = await Tasks.findByIdAndDelete(req.params.id)
      const task = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
       if(!task){
           res.status(404).send()
       }
       res.send(task)
    } catch (e){
        res.status(500).send(e)
    }
})

module.exports = router