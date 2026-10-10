import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NavBar from './components/NavBar'
import ErrorBoundary from './components/ErrorBoundary'
import PageNotFound from './components/PageNotFound'
import loginService from './services/login'
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNotificationActions } from './store/useNotificationStore'
import { useBlogs, useBlogActions } from './store/useBlogStore'

function App() {
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const [user, setUser] = useState(null)
  const blogs = useBlogs()
  const { initialize } = useBlogActions()
  const { updateNotification } = useNotificationActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  const loggedInUser = window.localStorage.getItem('loggedInUser')
  if (!user && loggedInUser) {
    const user = JSON.parse(loggedInUser)
    setUser(user)
  }

  const logUserIn = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      navigate('/')
    } catch (error) {
      const serverError = error?.response?.data?.error
      updateNotification(serverError, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    navigate('/')
  }

  const matchedBlog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

  if (!blogs) return <div>Loading....</div>

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <ErrorBoundary>
        <Notification />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/login" element={<LoginForm logUserIn={logUserIn} />} />
          <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}

export default App
