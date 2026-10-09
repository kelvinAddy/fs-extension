import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Error boundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <p>{this.state.error.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>try again</button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
