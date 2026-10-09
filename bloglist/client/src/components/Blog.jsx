import styled from 'styled-components'

const Card = styled.div`
  padding: 16px 20px;
  border-radius: 4px;
  background: #fff;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  box-shadow:
    0 2px 1px -1px rgba(0, 0, 0, 0.2),
    0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
`

const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 28px;
  font-weight: 400;
  color: #212121;
`

const Author = styled.div`
  margin-bottom: 12px;
  font-size: 16px;
  color: #616161;
`

const Url = styled.a`
  display: block;
  margin-bottom: 12px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  color: #0000ee;
`

const AddedBy = styled.div`
  margin-bottom: 12px;
  font-size: 14px;
  color: #616161;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #212121;
`

const OutlinedButton = styled.button`
  padding: 6px 16px;
  border: 1px solid ${({ $color }) => $color};
  border-radius: 4px;
  background: transparent;
  color: ${({ $color }) => $color};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background: ${({ $color }) => $color}14;
  }
`

const Blog = ({ removeBlog, updateLikes, blog }) => {
  if (!blog) return
  const handleLikes = async () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateLikes(likedBlog, likedBlog.id)
  }

  const handleRemoveBlog = () => {
    const deleteBlog = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (deleteBlog) {
      removeBlog(blog.id)
    }
  }
  return (
    <Card>
      <Title>{blog.title}</Title>
      <Author>by {blog.author}</Author>

      <Url href={`${blog.url}`} target="_blank" rel="noreferrer">
        {blog.url}
      </Url>
      <AddedBy>Added by {blog?.user?.name ?? blog?.user?.username}</AddedBy>
      <Actions>
        {blog.likes} likes{' '}
        <OutlinedButton $color="#1976d2" onClick={handleLikes}>
          like
        </OutlinedButton>
        <OutlinedButton $color="#d32f2f" onClick={handleRemoveBlog}>
          remove
        </OutlinedButton>
      </Actions>
    </Card>
  )
}

export default Blog
