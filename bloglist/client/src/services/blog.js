import axios from 'axios'

const baseUrl = '/api/blogs'

const extractToken = () => {
  const userJSON = window.localStorage.getItem('loggedInUser')

  if (!userJSON) return null

  const userObj = JSON.parse(userJSON)
  const token = `Bearer ${userObj.token}`
  return token
}

const post = async (blog) => {
  const config = { headers: { Authorization: extractToken() } }
  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

const get = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const put = async (blog, id) => {
  const config = { headers: { Authorization: extractToken() } }
  const res = await axios.put(`${baseUrl}/${id}`, blog, config)
  return res.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: extractToken() } }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { post, get, put, remove }
