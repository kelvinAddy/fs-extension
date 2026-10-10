import { useReducer, useRef } from 'react'
import NotificationContext from './NotificationContext'

const notificationData = {
  message: null,
  status: null,
}

const reducer = (state, actions) => {
  switch (actions.type) {
    case 'SHOW_NOTIFICATION': {
      return { ...state, message: actions.payload.message, status: actions.payload.status }
    }

    case 'CLEAR_NOTIFICATION': {
      return { ...state, message: null, status: null }
    }

    default:
      state
  }
}

const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, notificationData)
  const timeOutRef = useRef(null)

  const updateNotification = (message, status) => {
    clearTimeout(timeOutRef.current)
    dispatch({ type: 'SHOW_NOTIFICATION', payload: { message, status } })

    timeOutRef.current = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider
      value={{ message: state.message, status: state.status, updateNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
export default NotificationContextProvider
