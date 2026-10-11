import { useState } from 'react'
import blogService from '../services/blog'
import userService from '../services/users'
import { useNotificationActions } from '../store/useNotificationStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

export const useUser = () => useContext(UserContext)

export const useUsersData = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  return {
    isPending: result.isPending,
    isError: result.isError,
    users: result.data,
  }
}

export const useBlogs = () => {
  const queryClient = useQueryClient()
  const { updateNotification } = useNotificationActions()
  const navigate = useNavigate()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.get,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const createBlogMutatation = useMutation({
    mutationFn: blogService.post,

    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      updateNotification(`a new blog : ${newBlog.title} added`, 'success')
      navigate('/')
    },

    onError: (error) => {
      updateNotification(error?.response?.data?.error ?? 'Error encountered', 'error')
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,

    onSuccess: (variables) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((x) => x !== variables),
      )
      navigate('/')
    },

    onError: (error) => {
      updateNotification(error?.response?.data?.error ?? 'Error encountered', 'error')
    },
  })

  const addLikeMutation = useMutation({
    mutationFn: blogService.put,

    onSuccess: (likeBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((x) => (x.id === likeBlog.id ? likeBlog : x)),
      )
    },

    onError: (error) => {
      updateNotification(error?.response?.data?.error ?? 'Error encountered', 'error')
    },
  })

  const createCommentMutation = useMutation({
    mutationFn: ({ textObject, id }) => blogService.postComment(textObject, id),

    onSuccess: (data, variables) => {
      const blogs = queryClient.getQueryData(['blogs'])
      console.log(data, variables)
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) =>
          blog.id === variables.id ? { ...blog, comments: blog.comments.concat(data) } : blog,
        ),
      )
    },

    onError: (error) => {
      updateNotification(error?.response?.data?.error ?? 'Error encountered', 'error')
    },
  })

  return {
    result,
    createBlog: (blog) => createBlogMutatation.mutate(blog),
    removeBlog: (id) => removeBlogMutation.mutate(id),
    addLike: (blog) => addLikeMutation.mutate(blog),
    addComment: (textObject, id) => createCommentMutation.mutate({ textObject, id }),
  }
}

export const useLocalStorage = (key, initValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initValue
    } catch (error) {
      console.error(error, 'Your initial value will be used instead')
      return initValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(null)
    } catch (error) {
      console.error(error)
    }
  }
  return [storedValue, setValue, removeValue]
}
