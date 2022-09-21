import { Link } from 'react-router-dom'
import { Button } from './styledComponents/Button'

const Note = ({ note, editNote }) => {
  const handleImportanceChange = () => {
    note.important = !note.important

    editNote(note).catch(e => {
      console.error(e)
    })
  }

  return (
    <li>
      <p>id: {note.id}</p>
      <Link to={`/notes/${note.id}`}>{note.content}</Link>
      <small>{note.date}</small>
      <br />
      <Button onClick={handleImportanceChange}>{note.important ? 'make not important' : 'make important'}</Button>
    </li>
  )
}

export default Note
