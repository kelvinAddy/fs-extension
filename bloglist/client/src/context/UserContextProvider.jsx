import loginService from '../services/login'
import persistentUser from '../services/persistentUser'
import { useNavigate } from 'react-router-dom'
import UserContext from './UserContext'
import { useNotificationActions } from '../store/useNotificationStore'
import { useState } from 'react'

const UserContextProvider = ({ children }) => {
  const { getUser, removeUser, saveUser } = persistentUser
  const [storedUser, setStoredUser] = useState(() => getUser('loggedInUser', null))
  const navigate = useNavigate()

  const { updateNotification } = useNotificationActions()

  const logUserIn = async (credentials) => {
    try {
      const userData = await loginService.login(credentials)
      saveUser('loggedInUser', userData)
      setStoredUser(userData)
      navigate('/')
    } catch (error) {
      updateNotification(error?.response?.data?.error ?? 'Error encountered', 'error')
    }
  }

  const logUserOut = () => {
    removeUser('loggedInUser')
    setStoredUser(null)
    navigate('/')
  }

  return (
    <UserContext.Provider value={{ logUserIn, logUserOut, storedUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
