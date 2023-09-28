const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');

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

test('GET /news', async () => {
  const res = await request(app).get('/news');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /news', async () => {
  const category = await Category.create({ name: 'test' });
  const body = {
    headline: 'test headline',
    lead: 'test lead',
    author: 'test author',
    body: 'test body',
    categoryId: category.id,
  }
  const res = await request(app)
    .post('/news')
    .send(body)
    .set('Authorization', `Bearer ${token}`);
  id = res.body.id;
  await category.destroy();
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.headline).toBe(body.headline);
});

test('DELETE /news/:id', async () => {
  const res = await request(app)
    .delete(`/news/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});
