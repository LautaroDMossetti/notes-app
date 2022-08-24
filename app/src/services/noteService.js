import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const createNote = ({ id, content, date, important }) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  return axios.post(baseUrl, { id, content, date, important }, config)
    .then(response => {
      const { data } = response
      return data
    })
}

const getAllNotes = () => {
  return axios.get(baseUrl)
    .then(response => {
      const { data } = response
      return data
    })
}

const editNote = ({ id, content, date, important }) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  return axios.put(`${baseUrl}/${id}`, { id, content, date, important }, config)
    .then(response => {
      const { data } = response
      return data
    })
}

const noteService = { createNote, getAllNotes, setToken, editNote }

export default noteService
