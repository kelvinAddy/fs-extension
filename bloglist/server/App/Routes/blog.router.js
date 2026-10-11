const blogController = require('../Controllers/blog.controller')
const userExtractor = require('../Middlewares/middleware').userExtractor
const router = require('express').Router()

router.get('/', blogController.getBlogs)
router.get('/:id', blogController.getBlogsById)
router.use(userExtractor)
router.post('/', blogController.postBlog)
router.post('/:id/comments', blogController.postComment)
router.delete('/:id', blogController.deleteBlog)
router.put('/:id', blogController.putBlog)

module.exports = router
