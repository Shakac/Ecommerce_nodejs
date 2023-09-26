const request = require('supertest');
const app = require('../app');

test('GET /users', async () => {
  const res = await request(app).get('/users');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /users ', async () => {
  const body = {
    firstName: 'Alex',
    lastName: 'Bohorquez',
    email: 'alex@gmail.com',
    password: 'alex1234',
    phone: '123456789'
  }
  const res = await request(app).post('/users').send(body);
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.firstName).toBe(body.firstName);
  expect(res.body.password).toBeFalsy();
});
