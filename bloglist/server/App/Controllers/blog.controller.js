const Blog = require('../Models/blog.model')

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    _id: 1,
  })
  res.json(blogs)
}

exports.getBlogsById = async (req, res) => {
  const blog = await Blog.findById(req?.params?.id).populate('user', {
    username: 1,
    name: 1,
    _id: 1,
  })

  if (!blog) return res.status(404).json({ error: 'Blog was not found' })

  if (user._id.toString() === blog?.user?._id?.toString()) return res.json(blog)
  else return res.status(401).json({ error: 'Could not perform the request' })
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

  const blogToSend = await blog.populate('user', {
    username: 1,
    name: 1,
    _id: 1,
  })

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

    const blogToSend = await fetchedBlog.populate('user', {
      username: 1,
      name: 1,
      _id: 1,
    })
    return res.json(blogToSend)
  } else {
    res.status(401).json({ error: 'Unable to perform the request' })
  }
}
