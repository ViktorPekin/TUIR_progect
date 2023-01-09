import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import Main from '../main/Main'
import Login from '../login/Login'
import ProtectedRoute from '../protectedRoute/ProtectedRoute'
import Admin from '../admin/Admin'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
        localStorage.setItem('loggedIn', user.uid)
      }
    })
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/admin'
          element={
            <ProtectedRoute path='/' loggedIn={loggedIn ? loggedIn : localStorage.getItem('loggedIn')}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
