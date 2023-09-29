const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const Image = require('../models/Image');
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

test('GET /news', async () => {
  const res = await request(app).get('/news');
  console.log(res.body);
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

test('POST /news/:id/images', async () => {
  const image = await Image.create({ 
    url: 'http://cualquiercosa.jpg', 
    publicId: 'id' 
  })
  const res = await request(app)
    .post(`/news/${id}/images`)
    .send([image.id])
    .set('Authorization', `Bearer ${token}`)
  await image.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test('DELETE /news/:id', async () => {
  const res = await request(app)
    .delete(`/news/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});

