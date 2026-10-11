import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useUser } from '../hook'

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  margin-bottom: 20px;
  background: #1976d2;
  color: #fff;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  box-shadow:
    0 2px 4px -1px rgba(0, 0, 0, 0.2),
    0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
`

const Brand = styled.span`
  font-size: 20px;
  font-weight: 500;
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const NavLink = styled(Link)`
  padding: 6px 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    opacity: 0.8;
  }
`

const LogoutButton = styled.button`
  padding: 6px 8px;
  border: none;
  background: transparent;
  color: #fff;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

const NavBar = () => {
  const { storedUser: user, logUserOut } = useUser()

  return (
    <Nav>
      <Brand>Blog App</Brand>
      <Links>
        <NavLink style={{ padding: 5 }} to={'/'}>
          BLOGS
        </NavLink>
        {user && (
          <>
            <NavLink style={{ padding: 5 }} to={'/users'}>
              USERS
            </NavLink>
            <NavLink style={{ padding: 5 }} to={'/create'}>
              NEW BLOG
            </NavLink>
          </>
        )}
        {user ? (
          <LogoutButton onClick={logUserOut}>LOGOUT</LogoutButton>
        ) : (
          <NavLink style={{ padding: 5 }} to={'/login'}>
            LOGIN
          </NavLink>
        )}
      </Links>
    </Nav>
  )
}

export default NavBar
