import { useNavigate } from 'react-router-dom'
import { useAnecdotes, useField } from '../hooks'

const CreateNew = () => {
  const author = useField('text')
  const info = useField('text')
  const content = useField('text')
  const navigate = useNavigate()

  const { addAnecdote } = useAnecdotes()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content: content.value, author: author.value, info: info.value, votes: 0 })
    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    info.reset()
    author.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input name="content" {...{ ...content, reset: 1 }} />
        </div>
        <div>
          author
          <input name="author" {...{ ...author, reset: 1 }} />
        </div>
        <div>
          url for more info
          <input name="info" {...{ ...info, reset: 1 }} />
        </div>
        <button>create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  )
}

export default CreateNew
