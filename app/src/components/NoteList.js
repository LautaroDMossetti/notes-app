import Note from './Note'

const NoteList = ({ notes, editNote }) => {
  return (
    <ol>
      {notes.map(note => <Note key={note.id} note={note} editNote={editNote} />)}
    </ol>
  )
}

export default NoteList
