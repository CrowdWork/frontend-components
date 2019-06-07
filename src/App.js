import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'
import Navigation from './components/Navigation/Navigation'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import LegalIndex from './components/LegalIndex/LegalIndex'
import './App.css'

// const env = "http://localhost:4000"
const env = "https://ble-backend.herokuapp.com"
const authHeader = { 
  headers: {
  'Authorization': localStorage.token
}}

class App extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isLoggedIn: false,
    signupError: null,
    loginError: null,
    userID: null,
  }

  async componentDidMount() {
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true,
        userID: decode(localStorage.token)
      })
      try {
        const user = await axios.get(`${env}/users/me`, authHeader)
        this.setState({
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email
        })
      } catch (err) {
        console.log('ERROR:', err)
      }
      
    } else {
      this.setState({
        isLoggedIn: false,
        userID: null
      })
    }
  }

  handleSignup = () => {
    axios.post(`${env}/users`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        localStorage.token = response.data.token
        this.setState({
          isLoggedIn: true,
          userID: decode(localStorage.token)
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          signupError: err
        })
      });
  }

  onLoginSubmit = async (credentials) => {
    try {
      const loginUser = await axios.post(`${env}/users/login`, {
        email: credentials.email,
        password: credentials.password
      })

      localStorage.token = loginUser.data.token

      this.setState({
        firstName: loginUser.data.user.firstName,
        lastName: loginUser.data.user.lastName,
        email: loginUser.data.user.email,
        isLoggedIn: true
      })
      
      this.props.history.push('/')
    } catch (err) {
      this.setState({
        loginError: err
      })
    }
  }

  onLogout = () => {
    this.setState({
      email: "",
      password: "",
      isLoggedIn: false,
      userID: null
    })
    localStorage.clear()
  }

  render() {
    return (
      <div className="App-container">
        <Navigation
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          email={this.state.email} 
          isLoggedIn={this.state.isLoggedIn}
          onLogout={this.onLogout}
        />
        <main>
          <Switch>
            <Route 
              exact path="/"
              render={(props) => this.state.isLoggedIn ? (
                <Home 
                  {...props}
                  firstName={this.state.firstName}
                  isLoggedIn={this.state.isLoggedIn}
                  handleLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
              }
            />
            <Route path="/signup"
              render={(props) => (
                <Signup {...props} handleInput={this.handleInput} handleSignup={this.handleSignup}/>
              )}
            />
            <Route path="/login"
              render={(props) => this.state.isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login 
                  {...props}
                  handleInput={this.handleInput}
                  onSubmit={this.onLoginSubmit}
                />
              )
              }
            />
            <Route path="/legal-index"
              render={(props) => (
                <LegalIndex
                  {...props}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

export default withRouter(App)
