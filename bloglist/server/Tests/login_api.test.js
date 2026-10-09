const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const User = require('../App/Models/user.model');
const app = require('../App/app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../App/Utils/blog_test.helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

test('Successful login with valid data', async () => {
  const userForLogin = {
    username: 'Xerus1234',
    name: 'Kelvin Addy',
    password: 'Keladdy',
  };

  await api
    .post('/api/users')
    .send(userForLogin)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const usersAtStart = await helper.usersInDb();

  const result = await api
    .post('/api/login')
    .send(userForLogin)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert(Object.hasOwn(result.body, 'token'));

  const usersAtEnd = await helper.usersInDb();

  assert.deepStrictEqual(usersAtStart, usersAtEnd);
});

test('Fails with status 401 when invalid username or password is provided', async () => {
  const usersAtStart = await helper.usersInDb();

  const userForLogin = {
    username: 'Xerus1234',
    name: 'Kelvin Addy',
    password: 'xerus',
  };

  const result = await api.post('/api/login').send(userForLogin).expect(401);

  assert(!Object.hasOwn(result.body, 'token'));

  const usersAtEnd = await helper.usersInDb();

  assert.deepStrictEqual(usersAtStart, usersAtEnd);
});

after(async () => {
  await mongoose.connection.close();
});
