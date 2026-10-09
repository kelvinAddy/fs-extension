import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blog'
import NavBar from './components/NavBar'
import ErrorBoundary from './components/ErrorBoundary'
import PageNotFound from './components/PageNotFound'
import loginService from './services/login'
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(null)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    blogService.get().then((data) => setBlogs(data))
  }, [])

  const loggedInUser = window.localStorage.getItem('loggedInUser')
  if (!user && loggedInUser) {
    const user = JSON.parse(loggedInUser)
    setUser(user)
  }

  const updateNofitication = (message, type) => {
    setMessage(message)
    setType(type)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const addBlog = async (blog) => {
    try {
      const data = await blogService.post(blog)
      setBlogs([...blogs, data])
      navigate('/')
      updateNofitication(`a new blog ${blog.title} by ${blog.author}`, 'success')
    } catch (error) {
      const serverError = error?.response?.data?.error
      updateNofitication(serverError, 'error')
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      navigate('/')
    } catch (error) {
      const serverError = error?.response?.data?.error
      updateNofitication(serverError, 'error')
    }
  }

  const updateLikes = async (likedBlog, id) => {
    try {
      const data = await blogService.put(likedBlog, id)
      setBlogs(blogs.map((blog) => (blog.id === data.id ? data : blog)))
    } catch (error) {
      const serverError = error?.response?.data?.error
      updateNofitication(serverError, 'error')
    }
  }

  const logUserIn = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      navigate('/')
    } catch (error) {
      const serverError = error?.response?.data?.error
      updateNofitication(serverError, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    navigate('/')
  }

  const matchedBlog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <ErrorBoundary>
        <Notification message={message} type={type} />
        <Routes>
          <Route path="/" element={<BlogList blogs={blogs} />} />
          <Route path="/login" element={<LoginForm logUserIn={logUserIn} />} />
          <Route
            path="/blogs/:id"
            element={<Blog removeBlog={removeBlog} updateLikes={updateLikes} blog={matchedBlog} />}
          />
          <Route path="/create" element={<BlogForm addBlog={addBlog} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}

export default App
