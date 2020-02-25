const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/model/user')

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

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})


test('Signup new user', async () => {
    await request(app).post('/users').send({
      name: 'Namrta',
      email: 'namrta@abc.com',
      password: 'Pass1233@'
    }).expect(201)
})

test('Login Existing user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)
})

test('Should Not login nonexistent User', async () => {
  await request(app).post('/users/login').send({
    email: '',
    password: userOne.password
  }).expect(400)
} )

test('Get Profile for user', async () => {
  await request(app)
  .get('/users/me')
  .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
  .get('/users/me')
  .send()
  .expect(401)
})

test('Should Delete an existing user', async () => {
  await request(app)
  .delete('/users/me')
  .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(200)
})

test('Should not delete account of unauthorized user', async () => {
  await request(app)
  .delete('/users/me')
  .send()
  .expect(401)
})