const mongoose = require('mongoose')
const { server } = require('../index')
const Note = require('../models/Note')
const { initialNotes, api, getAllContentsFromNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  // ESTO NO FUNCIONA >>>>>
  //   initialNotes.forEach(async note => {
  //     const noteObject = new Note(note)
  //     await noteObject.save()
  //   })

  // Funciona, pero los elementos se añaden en paralelo,
  // por ej: el tercero podria añadirse antes que el primero y terminar en la primera celda
  //   const notesObjects = initialNotes.map(note => new Note(note))
  //   const promises = notesObjects.map(note => note.save())
  //   await Promise.all(promises)

  // Forma Secuencial, los elementos se añadiran en orden
  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are notes', async () => {
  const { response } = await getAllContentsFromNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about midudev', async () => {
  const { contents } = await getAllContentsFromNotes()

  expect(contents).toContain('Aprendiendo Fullstack JS con midudev')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'Proximamente async/await',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { contents, response } = await getAllContentsFromNotes()

  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(contents).toContain(newNote.content)
})

test('a note without content can be added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const { response } = await getAllContentsFromNotes()

  expect(response.body).toHaveLength(initialNotes.length)
})

test('a note can be deleted', async () => {
  const { response: firstResponse } = await getAllContentsFromNotes()
  const { body: notes } = firstResponse
  const noteToDelete = notes[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const { contents, response: secondResponse } = await getAllContentsFromNotes()

  expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
  expect(contents).not.toContain(noteToDelete.content)
})

test('a note that does not exist cant be deleted', async () => {
  await api
    .delete('/api/notes/123452')
    .expect(400)

  const { response } = await getAllContentsFromNotes()

  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
