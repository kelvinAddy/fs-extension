import { create } from 'zustand'

let timeOutId = null

const useNotificationStore = create((set) => ({
  notificaiton: { message: null, status: null },
  actions: {
    updateNotification: (message, status) => {
      set(() => ({ notificaiton: { message: message, status: status } }))

      clearTimeout(timeOutId)
      timeOutId = setTimeout(() => {
        set(() => ({ notificaiton: { message: null, status: null } }))
      }, 5000)
    },
  },
}))

export const useNotification = () => useNotificationStore((state) => state.notificaiton)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)

export default useNotificationStore
