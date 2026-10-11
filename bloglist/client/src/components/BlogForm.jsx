import styled from 'styled-components'
import { useBlogs } from '../hook'

const Container = styled.div`
  width: 400px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
`

const Title = styled.h1`
  margin: 0 0 20px;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 700;
`

const Field = styled.div`
  margin-bottom: 16px;
`

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  background: #fff;
  font-size: 16px;
  color: #212121;
  outline: none;

  &::placeholder {
    color: #757575;
  }

  &:focus {
    border-color: #1976d2;
    box-shadow: 0 0 0 1px #1976d2;
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

const BlogForm = () => {
  const { createBlog } = useBlogs()

  const handleAddBlog = async (formData) => {
    const blog = {
      url: formData.get('url'),
      author: formData.get('author'),
      title: formData.get('title'),
    }
    createBlog(blog)
  }
  return (
    <Container>
      <Title>create new</Title>
      <form action={handleAddBlog}>
        <Field>
          <Input type="text" name="title" placeholder="Title" aria-label="Tile" />
        </Field>
        <Field>
          <Input type="text" name="author" placeholder="Author" aria-label="Author" />
        </Field>
        <Field>
          <Input type="text" name="url" placeholder="URL" aria-label="URL" />
        </Field>
        <Field>
          <Button type="submit">create</Button>
        </Field>
      </form>
    </Container>
  )
}

export default BlogForm
