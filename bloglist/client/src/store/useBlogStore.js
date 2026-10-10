import { create } from 'zustand'
import blogService from '../services/blog'

const useBlogStore = create((set, get) => ({
  blogs: [],

  actions: {
    initialize: async () => {
      const data = await blogService.get()
      set(() => ({ blogs: data }))
    },

    createBlog: async (blog) => {
      const data = await blogService.post(blog)
      set((state) => ({ blogs: state.blogs.concat(data) }))
    },

    removeBlog: async (id) => {
      await blogService.remove(id)
      set((state) => ({ blogs: state.blogs.filter((blog) => blog.id !== id) }))
    },

    likeBlog: async (blog, id) => {
      const data = await blogService.put(blog, id)
      const updated = get().blogs.map((blog) => (blog.id === data.id ? data : blog))
      set(() => ({ blogs: updated }))
    },
  },
}))

export const useBlogs = () => useBlogStore((state) => state.blogs)
export const useBlogActions = () => useBlogStore((state) => state.actions)
