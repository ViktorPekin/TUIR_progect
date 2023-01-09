import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'

export type ProtectedRouteProps = {
  outlet: JSX.Element
  loggedIn: boolean
  authenticationPath: string
}

const ProtectedRoute = ({ outlet, loggedIn, authenticationPath }: ProtectedRouteProps) => {
  if (loggedIn) {
    return outlet
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />
  }
}

export default ProtectedRoute
/* loggedIn ? children : <Navigate to='/' /> */
