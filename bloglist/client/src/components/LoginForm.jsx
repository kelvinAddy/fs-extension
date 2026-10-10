import styled from 'styled-components'
import { useUser } from '../hook'

const Container = styled.div`
  width: 280px;
  padding: 16px 0;
  font-family: Roboto, Helvetica, Arial, sans-serif;
`

const Title = styled.h1`
  margin: 0 0 24px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 22px;
  font-weight: 700;
`

const Field = styled.div`
  margin-bottom: 16px;
`

const Input = styled.input`
  display: block;
  width: 190px;
  padding: 10px 0 6px;
  border: none;
  border-bottom: 1px solid #757575;
  background: transparent;
  font-size: 16px;
  color: #212121;
  outline: none;

  &::placeholder {
    color: #757575;
  }

  &:focus {
    border-bottom: 2px solid #1976d2;
  }
`

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #1976d2;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  &:hover {
    background: #1565c0;
  }
`

const LoginForm = () => {
  const { logUserIn } = useUser()

  const handleLogin = async (formData) => {
    const username = formData.get('username')
    const password = formData.get('password')

    logUserIn({ username, password })
  }
  return (
    <Container>
      <Title>log in to application</Title>
      <form action={handleLogin}>
        <Field>
          <Input type="text" name="username" placeholder="username" aria-label="username" />
        </Field>
        <Field>
          <Input type="text" name="password" placeholder="password" aria-label="password" />
        </Field>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
      </form>
    </Container>
  )
}

export default LoginForm
