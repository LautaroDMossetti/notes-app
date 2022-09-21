import CreateNoteForm from './components/CreateNoteForm'
import NoteList from './components/NoteList'
import { useNotes } from './hooks/useNotes'

function Notes ({ user, logoutUser }) {
  const { notes, addNote, editNote } = useNotes()

  if (!user) {
    return (
      <div>
        User is not logged
      </div>
    )
  }

  const handleLogout = () => {
    logoutUser()
  }

  console.log('render')

  /* eslint-disable react/jsx-indent */
  return (

    <div>

      <h1>Notes</h1>

      <div>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div>

        <CreateNoteForm
          addNote={addNote}
        />

        <NoteList notes={notes} editNote={editNote} />

      </div>
    </div>
  )
}

export default Notes
