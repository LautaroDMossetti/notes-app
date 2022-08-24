import './App.css'

import { useEffect, useState } from 'react'
import noteService from './services/noteService'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import CreateNoteForm from './components/CreateNoteForm'
import NoteList from './components/NoteList'

function App () {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('useEffect')

    setLoading(true)

    console.log('timeout')

    noteService.getAllNotes().then(notes => {
      setNotes(notes)

      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const addNote = (noteToAddToState) => {
    console.log('crear nota')

    setError('')

    noteService.createNote(noteToAddToState)
      .then(newNote => {
        setNotes(prevNotes => prevNotes.concat(newNote))
      }).catch(e => {
        console.error(e)

        setError('la API ha petado')
      })
  }

  const editNote = (editedNote) => {
    console.log('editar nota')

    setError('')

    noteService.editNote(editedNote)
      .then(editedNote => {
        setNotes(prevNotes => {
          return prevNotes.map(note => {
            if (note.id === editedNote.id) {
              note = editedNote
            }

            return note
          })
        })
      }).catch(e => {
        console.error(e)

        setError('la API ha petado')
      })
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)

      setUser(user)

      console.log(user)
    } catch (e) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  console.log('render')

  /* eslint-disable react/jsx-indent */
  return (

    <div>

      <h1>Notes</h1>

      {loading ? 'Cargando...' : ''}

      {error ? <span>{error}</span> : ''}

      {user
        ? <div>

          <div>
            <button onClick={handleLogout}>
              Logout
            </button>
          </div>

          <CreateNoteForm
            addNote={addNote}
          />

          <NoteList notes={notes} editNote={editNote} />

          </div>
        : <div>

          <LoginForm
            login={login}
          />

          </div>}
    </div>
  )
}

export default App
