const supertest = require('supertest')
const { app } = require('../index')
const User = require('../models/User')

const api = supertest(app)

const getAllContentsFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

const initialNotes = [
  {
    content: 'Aprendiendo Fullstack JS con midudev',
    important: true,
    date: new Date()
  },
  {
    content: 'Sigueme en https://midu.tube',
    important: true,
    date: new Date()
  },
  {
    content: 'Gracias al chat por vuestra ayuda! :D',
    important: true,
    date: new Date()
  }
]

module.exports = { initialNotes, getUsers, api, getAllContentsFromNotes }
