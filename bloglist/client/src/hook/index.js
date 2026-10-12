import blogService from '../services/blog'
import usersService from '../services/users'
import { useNotificationActions } from '../store/useNotificationStore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

export const useUser = () => useContext(UserContext)

export const useUsersData = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAllUsers,
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
