import { Link } from 'react-router-dom'

const BlogListPage = ({ blogs }) => {
  blogs.sort((a, b) => b.likes - a.likes)
  return (
    <>
      <h1>blogs</h1>
      {blogs.map((blog) => (
        <ul>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        </ul>
      ))}
    </>
  )
}

export default BlogListPage
