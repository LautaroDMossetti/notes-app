import { useEffect, useState } from 'react'
import noteService from '../services/noteService'

export const useNotes = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getAllNotes().then(notes => {
      setNotes(notes)
    })
  }, [])

  const addNote = (noteToAddToState) => {
    return noteService.createNote(noteToAddToState)
      .then(newNote => {
        setNotes(notes.concat(newNote))
      })
  }

  const editNote = (editedNote) => {
    return noteService.editNote(editedNote)
      .then(editedNote => {
        setNotes(notes.map(note => {
          if (note.id === editedNote.id) {
            note = editedNote
          }
          return note
        }))
      })
  }

  return {
    notes,
    addNote,
    editNote
  }
}
