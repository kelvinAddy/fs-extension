import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogListPage from './pages/BlogListPage'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NavBar from './components/NavBar'
import ErrorBoundary from './components/ErrorBoundary'
import PageNotFound from './pages/PageNotFound'
import UsersPage from './pages/UsersPage'
import User from './components/User'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <NavBar />
      <ErrorBoundary>
        <Notification />
        <Routes>
          <Route path="/" element={<BlogListPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<User />} />
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
