const { test, after, describe, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const app = require('../App/app');
const helper = require('../App/Utils/blog_test.helper');
const Blog = require('../App/Models/blog.model');
const User = require('../App/Models/user.model');

const api = supertest(app);

let token = '';

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const userToAdd = helper.dummyUser;

  await api
    .post('/api/users')
    .send(userToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const res = await api
    .post('/api/login')
    .send({
      username: helper.dummyUser.username,
      password: helper.dummyUser.password,
    })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  token = `Bearer ${res.body.token}`;
});

describe('Getting blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs have a unique identifier id and not _id', async () => {
    const response = await api.get('/api/blogs');
    const results = response.body;
    assert(results.every((blog) => Object.hasOwn(blog, 'id')));
  });

  test('blog with valid id is returned', async () => {
    const usersAtStart = await helper.usersInDb();
    const userToGet = usersAtStart[0];

    const result = await api
      .get(`/api/blogs/${userToGet.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(result.body.id, userToGet.id);
  });
});

test('blogs populate with users who created them', async () => {
  const blogToAdd = { ...helper.blogs[0] };

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const usersAtEnd = await helper.usersInDb();

  const createdUsers = usersAtEnd.map((user) => user.id);
  assert(createdUsers.includes(result.body[0].user.id));
});

test('a blog can be added', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const newBlog = { ...helper.blogs[0], author: 'Kelvin Addy', likes: 23 };

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);

  const titles = blogsAtEnd.map(({ title }) => title);
  assert(titles.includes(newBlog.title));
});

test('likes is defaulted to zero if it does not exist in request', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  };

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const addedBlog = blogsAtEnd.at(-1);
  assert.strictEqual(addedBlog.likes, 0);
});

test('400 request is received if url and content are missing in blog', async () => {
  const newBlog = {};

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400);
});

test('blog deletion succeeds with status 204', async () => {
  const newBlog = { ...helper.blogs[0], author: 'Kelvin Addy', likes: 23 };

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtStart = await helper.blogsInDb();

  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', token)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

  const ids = blogsAtEnd.map(({ id }) => id);
  assert(!ids.includes(blogToDelete.id));
});

test.only('updating blog succeeds with valid data', async () => {
  const newBlog = { ...helper.blogs[0], author: 'Kelvin Addy', likes: 23 };

  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = { ...blogsAtStart[0], likes: 400 };

  const results = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', token)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length);

  assert.strictEqual(
    blogsAtEnd.find(({ id }) => id === results.body.id).likes,
    blogToUpdate.likes,
  );
});

after(async () => {
  await mongoose.connection.close();
});
