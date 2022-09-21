import { useParams } from 'react-router-dom'
import { useNotes } from '../hooks/useNotes'

export default function NoteDetail () {
  const { noteId } = useParams()

  const { notes } = useNotes()

  const note = notes.find(note => note.id === noteId)

  if (!note) return null

  console.log(note)

  return (
    <div>
      <h2>{note.content}</h2>
      <p>id: {note.id}</p>
      <small>{note.date}</small>
      <div>usuario: {note.user.name}</div>
      <div>
        <strong>{note.important ? '(important)' : '(not important)'}</strong>
      </div>
    </div>
  )
}
