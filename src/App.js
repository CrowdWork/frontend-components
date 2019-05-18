import React, { Component } from 'react'
import NavBar from './components/NavBar'
import FormSignup from './components/FormSignup'

class App extends Component {

  getUserProfile() {
    fetch()
  }
  render() {
    return (
      <div>
        <NavBar />
        <FormSignup />
      </div>
    )
  }
}

export default App
