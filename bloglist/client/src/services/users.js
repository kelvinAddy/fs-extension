import axios from 'axios'

const baseUrl = '/api/users'

const getUsers = async () => {
  const res = await axios.get(baseUrl)
  return await res.data
}

export default { getUsers }
