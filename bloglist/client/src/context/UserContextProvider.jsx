import { useLocalStorage } from '../hook'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'
import UserContext from './UserContext'
import { useNotificationActions } from '../store/useNotificationStore'

const UserContextProvider = ({ children }) => {
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage('loggedInUser', null)
  const navigate = useNavigate()

  const { updateNotification } = useNotificationActions()

  const logUserIn = async (credentials) => {
    try {
      const userData = await loginService.login(credentials)
      setStoredUser(userData)
      navigate('/')
    } catch (error) {
      updateNotification(error?.response?.data?.error ?? 'Error encountered', 'error')
    }
  }

  const logUserOut = () => {
    removeStoredUser()
    navigate('/')
  }

  return (
    <UserContext.Provider value={{ logUserIn, logUserOut, storedUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
