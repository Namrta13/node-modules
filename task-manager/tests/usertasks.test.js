const request = require('supertest')
const app = require('../src/app')
const Tasks = require('../src/model/task')
const { userOneId, userOne, userTwo, userTwoId, taskOne, taskTwo, taskThree, setupDatabase } = require('./fixtures/db')


beforeEach(setupDatabase)

test('Create a task for user', async () => {
     const response =  await request(app).post('/tasks')
     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
     .send({
         description: 'To Test Data'
     }).expect(201)

     const task = await Tasks.findById(response.body._id)
     expect(task).not.toBeNull()
     expect(task.completed).toBe(false)
})

test('Get Tasks For Particular User', async() => {
    const response = await request(app).get('/tasks').set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    
    expect(response.body.length).toEqual(2) 

})

test('Delet Task of Other User', async () => {
    request(app).delete('/users/' + taskOne._id).set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send().expect(404)

    const task = await Tasks.findById(taskOne._id)
    expect(task).not.toBeNull()
})

//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks