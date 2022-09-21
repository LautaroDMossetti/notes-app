import LoginForm from './components/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = ({ loginUser }) => {
  const [error, setError] = useState()
  const navigate = useNavigate()

  const logTheUser = async (username, password) => {
    try {
      await loginUser(username, password).then(() => navigate('/notes'))
    } catch (e) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Login</h1>

      {error ? <span>{error}</span> : ''}

      <LoginForm logTheUser={logTheUser} />
    </div>
  )
}

export default Login
