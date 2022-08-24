const Note = ({ note, editNote }) => {
  const handleImportanceChange = () => {
    note.important = !note.important

    // Change in database
    editNote(note)
  }

  return (
    <li>
      <p>id: {note.id}</p>
      <p>{note.content}</p>
      <small>{note.date}</small>
      <br />
      <button onClick={handleImportanceChange}>{note.important ? 'make not important' : 'make important'}</button>
    </li>
  )
}

export default Note
