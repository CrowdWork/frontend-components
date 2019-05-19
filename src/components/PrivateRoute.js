import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  
  <Route {...rest} render={props => (
    console.log(isLoggedIn)
    
    )}
    />
  )

export default PrivateRoute
