import { useMatch } from 'react-router-dom'
import { useUsersData } from '../hook'

const User = () => {
  const { isPending, isError, users } = useUsersData()
  const match = useMatch('/users/:id')

  if (isPending) return <div>Loading....</div>
  if (isError) return <div>Error encountered</div>

  const user = match ? users?.find((x) => x.id === match.params.id) : null
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
