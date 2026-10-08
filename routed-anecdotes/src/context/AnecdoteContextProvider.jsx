import { useState } from 'react'
import { AnecdoteContext } from './AnecdoteContext'

export const AnecdoteContextProvider = ({ children }) => {
  const [anecdotes, setAnecdotes] = useState([])
  return (
    <AnecdoteContext.Provider value={{ anecdotes, setAnecdotes }}>
      {children}
    </AnecdoteContext.Provider>
  )
}
