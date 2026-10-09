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

describe('Adding users', () => {
  test('Valid users are added successfully', async () => {
    const usersAtStart = await helper.usersInDb();

    const userToBeAdded = {
      username: 'Dexter1234',
      name: 'Jonas Klaus',
      password: 'Keladdy',
    };

    await api
      .post('/api/users')
      .send(userToBeAdded)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const users = usersAtEnd.map(({ username }) => username);
    assert(users.includes(userToBeAdded.username));
  });

  test('Fails when username is missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const userToBeAdded = {
      name: 'Lex Luthor',
    };

    await api.post('/api/users').send(userToBeAdded).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    assert.deepStrictEqual(usersAtStart, usersAtEnd);
  });

  test('Fails when username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const userToBeAdded = {
      username: 'ke',
      password: 'Laddy',
      name: 'Pop',
    };
    await api.post('/api/users').send(userToBeAdded).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    assert.deepStrictEqual(usersAtStart, usersAtEnd);
  });

  test('Fails when password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const userToBeAdded = {
      username: 'keyer',
      password: 'La',
      name: 'Pop',
    };
    await api.post('/api/users').send(userToBeAdded).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    assert.deepStrictEqual(usersAtStart, usersAtEnd);
  });

  test('Fails when username and password are missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const userToBeAdded = {
      name: 'Pop',
    };
    await api.post('/api/users').send(userToBeAdded).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    assert.deepStrictEqual(usersAtStart, usersAtEnd);
  });

  test('Fails with error 400 when username is not unique', async () => {
    const result = await api
      .post('/api/users')
      .send({ username: 'Sero', password: 'Deran' })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtStart = await helper.usersInDb();

    const dummyUser = {
      username: result?.body?.username,
      password: 'Kelady',
      name: 'Lex Friedman',
    };

    await api.post('/api/users').send(dummyUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.deepStrictEqual(usersAtStart, usersAtEnd);
  });
});

after(async () => {
  await mongoose.connection.close();
});
