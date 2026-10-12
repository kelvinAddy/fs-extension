import User from '../Models/user.model'
import Blog from '../Models/blog.model'
import Comment from '../Models/comment.model'

const router = import('express').Router()

router.post('/reset', async (req, res) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Comment.deleteMany({})
})

export default router
