import axios from 'axios'

const baseUrl = '/api/users'

const getAllUsers = async () => {
  const res = await axios.get(baseUrl)
  return await res.data
}

export default { getAllUsers }
