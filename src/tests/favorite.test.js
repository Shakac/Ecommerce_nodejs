const app = require('../app');
const request = require('supertest');
require('../models');

let token;
let id;

beforeAll(async () => {
  const body = {
    email: 'test@gmail.com',
    password: 'test1234'
  }
  const res = await request(app).post('/users/login').send(body);
  token = res.body.token;
});

test('GET /favorites', async () => {
  const res = await request(app)
    .get('/favorites')
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /favorites', async () => {
  const body = { rate: "5" }
  const res = await request(app)
    .post('/favorites')
    .send(body)
    .set('Authorization', `Bearer ${token}`)
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.rate).toBe(body.rate);
});

test('DELETE /favorites/:id', async () => {
  const res = await request(app)
    .delete(`/favorites/${id}`)
    .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(204);
});
