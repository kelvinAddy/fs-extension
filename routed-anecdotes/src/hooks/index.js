import { useState, useEffect, useContext } from 'react'
import { AnecdoteContext } from '../context/AnecdoteContext'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }
  return {
    type: type,
    onChange,
    value: value,
    reset,
  }
}

export const useAnecdotes = () => {
  const { anecdotes, setAnecdotes } = useContext(AnecdoteContext)
  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnecdotes(data))
  }, [anecdotes])

  const addAnecdote = async (anecdote) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    setAnecdotes(anecdotes.concat(newAnecdote))
  }

  const deleteAnecdote = async (id) => {
    await anecdoteService.remove(id)
    setAnecdotes(anecdotes.filter((x) => x.id !== id))
  }

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote,
  }
}
