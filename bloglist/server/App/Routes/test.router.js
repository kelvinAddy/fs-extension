const User = require('../Models/user.model')
const Blog = require('../Models/blog.model')
const Comment = require('../Models/comment.model')

const router = require('express').Router()

router.post('/reset', async (req, res) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Comment.deleteMany({})
  res.status(204).end()
})

module.exports = router
