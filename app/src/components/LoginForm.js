import { useState } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    login(username, password)

    setUsername('')
    setPassword('')
  }

  const handleChangeUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>

      <Togglable buttonLabel='Show login'>

        <h3>Sing In</h3>

        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={handleChangeUsername}
          />
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={handleChangePassword}
          />
          <button>
            Login
          </button>
        </form>
      </Togglable>

    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
