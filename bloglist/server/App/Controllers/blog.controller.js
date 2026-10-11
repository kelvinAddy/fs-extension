const Blog = require('../Models/blog.model')
const Comment = require('../Models/comment.model')

const blogStructureToClient = [
  { path: 'user', select: '-blogs' },
  { path: 'comments', populate: { path: 'user', select: '-blogs' } },
]

const commentStructureToClient = [{ path: 'user', select: '-blogs' }]

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate(blogStructureToClient)
  res.json(blogs)
}

exports.getBlogsById = async (req, res) => {
  const blog = await Blog.findById(req?.params?.id).populate(blogStructureToClient)

  if (!blog) return res.status(404).json({ error: 'Blog was not found' })

  return res.json(blog)
}

exports.postBlog = async (req, res) => {
  if (!req?.body?.url || !req?.body?.title) {
    return res.status(400).json({ error: 'Url or title is missing' })
  }

  const user = req.user

  const blog = await Blog.create({
    ...req?.body,
    likes: req?.body?.likes ?? 0,
    user: user._id,
  })

  user.blogs = [...user.blogs, blog._id]
  await user.save()

  const blogToSend = await blog.populate(blogStructureToClient)

  res.status(201).json(blogToSend)
}

exports.deleteBlog = async (req, res) => {
  const user = req.user

  const blogToDelete = await Blog.findById(req.params.id)

  if (blogToDelete?.user?.toString() === user._id.toString()) {
    await blogToDelete.deleteOne()
    return res.status(204).end()
  } else {
    res.status(401).json({ error: 'Unable to perform the request' })
  }
}

exports.putBlog = async (req, res) => {
  if (!req?.body?.url || !req?.body?.title) {
    return res.status(400).json({ error: 'Url or title is missing' })
  }

  const user = req.user
  const fetchedBlog = await Blog.findById(req?.params?.id)

  if (user) {
    fetchedBlog.likes = req.body.likes
    await fetchedBlog.save()

    const blogToSend = await fetchedBlog.populate(blogStructureToClient)
    return res.json(blogToSend)
  } else {
    res.status(401).json({ error: 'Unable to perform the request' })
  }
}

exports.postComment = async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ error: 'Error encountered' })
  }

  const user = req.user
  const fetchedBlog = await Blog.findById(req?.params.id)

  if (user) {
    const comment = await Comment.create({ text: req.body.text, user: user._id })
    fetchedBlog.comments = [...fetchedBlog.comments, comment._id]
    await fetchedBlog.save()

    const commentToClient = await comment.populate(commentStructureToClient)

    res.status(201).json(commentToClient)
  } else {
    res.status(400).json({ error: 'Unable to perform the request' })
  }
}
