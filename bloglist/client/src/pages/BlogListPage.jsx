import { Link } from 'react-router-dom'
import { useBlogs } from '../hook'

const BlogListPage = () => {
  const { result } = useBlogs()

  if (result.isPending) return <div>Loading...</div>
  if (result.isError) return <div>Something went wrong</div>

  const blogs = result.data

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
