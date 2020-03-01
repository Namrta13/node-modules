const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/model/user')
const Tasks = require('../../src/model/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'Mike@abc.com',
  password: 'Hello123',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
}
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: 'Aayush',
  email: 'Aayush@abc.com',
  password: 'MyPass123',
  tokens: [{
    token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
  }]
}

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'First Task',
  completed: false,
  owner: userOneId
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Second Task',
  completed: true,
  owner: userOneId
}

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Third Task',
  completed: true,
  owner: userTwoId
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Tasks.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Tasks(taskOne).save()
    await new Tasks(taskTwo).save()
    await new Tasks(taskThree).save()

}

module.exports = {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase
}