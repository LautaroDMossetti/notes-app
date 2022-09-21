import { useRef, useState } from 'react'
import Togglable from './Togglable'

const CreateNoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteToAddToState = {
      content: newNote,
      important: false
    }

    try {
      addNote(noteToAddToState)
    } catch (e) {
      console.error(e)
    }

    setNewNote('')
    togglableRef.current.toggleVisibility()
  }

  return (

    <div>

      <Togglable buttonLabel='Show create note' ref={togglableRef}>

        <h3>Create A New Note</h3>

        <form onSubmit={handleSubmit}>

          <input type='text' placeholder='Write your note content' onChange={handleChange} value={newNote} />

          <button>Save Note</button>

        </form>
      </Togglable>

    </div>
  )
}

export default CreateNoteForm
