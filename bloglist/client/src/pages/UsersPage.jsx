import { useUsersData } from '../hook'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-family: Roboto, Helvetica, Arial, sans-serif;
  color: #212121;
  padding: 16px;
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: 400;
  margin: 0 0 24px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`

const Th = styled.th`
  text-align: left;
  font-weight: 700;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
`

const Td = styled.td`
  padding: 18px 16px;
  border-bottom: 1px solid #e0e0e0;
`

const UsersPage = () => {
  const { isPending, isError, users } = useUsersData()

  if (isPending) return <div>Loading....</div>
  if (isError) return <div>Error encountered</div>

  return (
    <Wrapper>
      <Title>Users</Title>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Username</Th>
            <Th>Blogs created</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <Td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Td>
              <Td>{user.username}</Td>
              <Td>{user.blogs.length}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  )
}

export default UsersPage
