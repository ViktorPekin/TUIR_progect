import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import Main from '../main/Main'
import Login from '../login/Login'
import Admin from '../admin/Admin'

import ProtectedRoute, { ProtectedRouteProps } from '../protectedRoute/ProtectedRoute'

const App = () => {
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

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    loggedIn: loggedIn ? loggedIn : localStorage.getItem('loggedIn') ? true : false,
    authenticationPath: '/',
  }

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Admin />} />}></Route>
      </Routes>
    </div>
  )
}

export default App
