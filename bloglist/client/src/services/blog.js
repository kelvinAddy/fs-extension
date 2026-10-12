import axios from 'axios'
import persistentUser from './persistentUser'

const baseUrl = '/api/blogs'

const extractToken = () => {
  const { getUser } = persistentUser

  const userObj = getUser('loggedInUser', null)
  const token = userObj?.token

  if (!token) return null

  return `Bearer ${token}`
}

const post = async (blog) => {
  const config = { headers: { Authorization: extractToken() } }
  const res = await axios.post(baseUrl, blog, config)
  return await res.data
}

const postComment = async (textObject, id) => {
  const config = { headers: { Authorization: extractToken() } }
  const res = await axios.post(`${baseUrl}/${id}/comments`, textObject, config)
  return await res.data
}

const get = async () => {
  const res = await axios.get(baseUrl)
  return await res.data
}

const put = async (blog) => {
  const config = { headers: { Authorization: extractToken() } }
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return await res.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: extractToken() } }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return await res.data
}

export default { post, get, put, remove, postComment }
