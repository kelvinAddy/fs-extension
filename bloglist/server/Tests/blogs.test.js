const { test, describe } = require('node:test');
const assert = require('node:assert');
const listhelper = require('../App/Utils/blog_test.helper');
const blogs = require('./blogs.data');

test('dummy returns one', () => {
  const results = listhelper.dummy([]);
  assert.strictEqual(results, 1);
});

test('dummy fails if no blogs is passed', () => {
  const results = listhelper.dummy();
  assert.strictEqual(results, undefined);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ];
  test('when list has only one blog, returns likes of only that blog', () => {
    const results = listhelper.totalLikes(listWithOneBlog);
    assert.strictEqual(results, 5);
  });

  test('List returns accurate number of total likes', () => {
    const results = listhelper.totalLikes(blogs);
    assert.strictEqual(results, 36);
  });
});

describe('Favorite Blog', () => {
  test('Returns the blogs with the most likes', () => {
    const results = listhelper.favoriteBlog(blogs);
    assert.deepStrictEqual(results, {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    });
  });
});

describe('Most Blogs', () => {
  test('Returns the author with the most blogs', () => {
    const results = listhelper.mostBlogs(blogs);
    assert.deepStrictEqual(results, { author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('Most Likes', () => {
  test('Returns the author with the most likes', () => {
    const results = listhelper.mostLikes(blogs);
    assert(results, {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
