import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NavBar from './components/NavBar'
import ErrorBoundary from './components/ErrorBoundary'
import PageNotFound from './components/PageNotFound'
import { Routes, Route } from 'react-router-dom'
import { useBlogs } from './hook'

function App() {
  const { result } = useBlogs()

  if (result.isPending) return <div>Loading...</div>
  if (result.isError) return <div>Something went wrong</div>

  return (
    <>
      <NavBar />
      <ErrorBoundary>
        <Notification />
        <Routes>
          <Route path="/" element={<BlogList blogs={result.data} />} />
          <Route path="/users" />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}

export default App
