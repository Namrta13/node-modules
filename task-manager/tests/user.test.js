const request = require('supertest')
const app = require('../src/app')

test('Signup new user', async () => {
    await request(app).post('/users').send({
      name: 'Namrta',
      email: 'namrta@abc.com',
      password: 'Pass1233@'
    }).expect(201)
})
