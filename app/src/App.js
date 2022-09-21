import './App.css'
import React from 'react'
import { Link, BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Notes from './Notes'
import NoteDetail from './components/NoteDetail'
import Login from './Login'
import { useUser } from './hooks/useUser'
import { StyledLink } from './components/styledComponents/StyledLink'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

const App = () => {
  const { user, logoutUser, loginUser } = useUser()

  const inlinesStyles = {
    padding: 5
  }

  /* eslint-disable react/jsx-indent */
  return (
    <BrowserRouter>
      <header>
        <StyledLink to='/' style={inlinesStyles}>
          Home
        </StyledLink>
        <StyledLink to='/notes' variant='bold' style={inlinesStyles}>
          Notes
        </StyledLink>
        <Link to='/users' style={inlinesStyles}>
          Users
        </Link>
        {
          user
            ? <em>Logged as {user.name}</em>
            : <Link to='/login' style={inlinesStyles}>
                Login
              </Link>
        }

      </header>

      <Routes>
        <Route path='/notes/:noteId' element={<NoteDetail />} />

        <Route path='/notes' element={<Notes user={user} logoutUser={logoutUser} />} />

        <Route path='/users' element={<Users />} />

        <Route
          path='/login' element={
            user ? <Navigate to='/' replace /> : <Login loginUser={loginUser} />
          }
        />

        <Route path='/' element={<Home />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
