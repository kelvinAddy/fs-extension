import styled from 'styled-components'
import { useNotification } from '../store/useNotificationStore'

const colors = {
  success: { bg: '#edf7ed', text: '#1e4620', icon: '#4caf50' },
  error: { bg: '#fdeded', text: '#5f2120', icon: '#ef5350' },
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 4px;
  background: ${({ $type }) => colors[$type].bg};
  color: ${({ $type }) => colors[$type].text};
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  margin-block: 20px;
`

const Icon = styled.svg`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  fill: none;
  stroke: ${({ $type }) => colors[$type].icon};
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
`

const Notification = () => {
  const { message, status: type } = useNotification()
  if (!message) return
  return (
    <Wrapper $type={type} role="status">
      <Icon $type={type} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.5 11.1V12a9.5 9.5 0 1 1-5.6-8.7" />
        <path d="M21.5 4.5 12 14l-3-3" />
      </Icon>
      {message}
    </Wrapper>
  )
}

export default Notification
