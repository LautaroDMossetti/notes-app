import { useState } from 'react'

const useField = ({ type }) => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const LoginForm = ({ logTheUser }) => {
  const username = useField({ type: 'text' })
  const password = useField({ type: 'password' })

  const handleSubmit = (event) => {
    event.preventDefault()

    logTheUser(username.value, password.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        {... username}
        name='Username'
        placeholder='Username'
      />
      <input
        {... password}
        name='Password'
        placeholder='Password'
      />
      <button>
        Login
      </button>
    </form>
  )
}

export default LoginForm
