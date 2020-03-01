const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/model/user')



beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})


test('Signup new user', async () => {
   const response = await request(app).post('/users').send({
      name: 'Namrta',
      email: 'namrta@abc.com',
      password: 'Pass1233@'
    }).expect(201)

    //Assert that database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assert about the response
   //one way expect(response.body.user.name).toBe('Namrta')
  //to check the response for specified properties
   expect(response.body).toMatchObject({
          user: {
            name: 'Namrta',
            email: 'namrta@abc.com'
          },
          token: user.tokens[0].token
   })
   expect(user.password).not.toBe('Pass1233@')
  })

test('Login Existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)
  
  //Validate new token is saved
  const user = await User.findById(userOneId)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should Not login nonexistent User', async () => {
  await request(app).post('/users/login').send({
    email: '',
    password: userOne.password
  }).expect(400)

})

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

  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})

test('Should not delete account of unauthorized user', async () => {
  await request(app)
  .delete('/users/me')
  .send()
  .expect(401)
})

test('Should Upload avatar image', async () => {
   await request(app).post('/users/me/avatar')
   .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
   .attach('avatar', 'tests/fixtures/profile-pic.jpg')
   .expect(200)

   const user = await User.findById(userOneId)
   //expect({}).toBe({}) uses === to compare results hence false as two empty objects are not equal
   //comparing the properties
   //expect({}).toEqual({})
     expect(user.avatar).toEqual(expect.any(Buffer)) 
  })

  test('Should update valid user fields', async () => {
    const response = await request(app).patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Namrta'
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Namrta')
  })

  test('Should not update invalid user fields', async () => {
    await request(app).patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Pune'
    }).expect(400)
  })