import { useEffect, useState } from 'react'
import noteService from '../services/noteService'
import loginService from '../services/loginService'

export const useUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const logoutUser = () => {
    setUser(null)
    noteService.setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
    console.log('logout')
  }

  const loginUser = async (username, password) => {
    const newUser = await loginService.login({ username, password })

    window.localStorage.setItem(
      'loggedNoteAppUser', JSON.stringify(newUser)
    )

    noteService.setToken(newUser.token)

    setUser(newUser)

    console.log(newUser)

    return newUser
  }

  return {
    user,
    logoutUser,
    loginUser
  }
}
